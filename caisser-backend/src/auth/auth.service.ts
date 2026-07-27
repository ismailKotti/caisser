import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    console.log(`\n--- TENTATIVE DE CONNEXION ---`);
    console.log(`Email reçu: '${loginDto.email}', Mot de passe brut: '${loginDto.pass}'`);
    
    const user = await this.usersService.findByEmailForAuth(loginDto.email);
    if (!user) {
      console.log(`=> Échec: Aucun utilisateur trouvé avec l'email '${loginDto.email}' dans PostgreSQL.`);
      throw new UnauthorizedException(`ÉCHEC BDD: L'email '${loginDto.email}' est introuvable dans la table User sur PostgreSQL.`);
    }
    console.log(`=> Utilisateur trouvé en base (ID: ${user.id_user}, Email BDD: '${user.email}').`);
    console.log(`=> Hash présent en base: '${user.pass}'`);

    if (typeof user.pass !== 'string') {
      throw new UnauthorizedException(`ÉCHEC BDD: Le format du mot de passe en base est invalide (type: ${typeof user.pass}).`);
    }

    const cleanStoredHash = user.pass.trim();
    const cleanInputPass = (loginDto.pass || '').trim();

    const isPasswordValid = await bcrypt.compare(cleanInputPass, cleanStoredHash);
    console.log(`=> Résultat de la comparaison bcrypt après trim: ${isPasswordValid ? 'SUCCÈS' : 'ÉCHEC'}`);
    
    if (!isPasswordValid) {
      const newValidHash = await bcrypt.hash(cleanInputPass, 10);
      throw new UnauthorizedException(`ÉCHEC MOT DE PASSE: L'utilisateur existe en BDD mais le mot de passe est rejeté par bcrypt. Valeur actuelle en BDD (après trim): "${cleanStoredHash}". Hash bcrypt tout neuf généré pour "${cleanInputPass}" (à copier sans espace ni saut de ligne) : ${newValidHash}`);
    }

    const roleName = user.role?.type_role || 'Caissier';

    const payload = {
      sub: user.id_user,
      email: user.email,
      role: roleName,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id_user,
        email: user.email,
        role: roleName,
      },
    };
  }
}
