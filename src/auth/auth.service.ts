/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { TYPE_USER } from 'src/user/dto/create-user.dto';
import { MedecinService } from 'src/medecin/medecin.service';
import { PatientService } from 'src/patient/patient.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private medecinService: MedecinService,
    private patientService: PatientService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const { data: user } = await this.userService.login(username);
    if (user !== null) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (user && isMatch) {
        let userInfo: any;
        if (user.type_user === TYPE_USER.MEDECIN) {
          const { data: otherData } = await lastValueFrom(
            this.medecinService.findByUserId(user._id),
          );
          userInfo = { ...user, ...otherData };
        } else if (user.type_user === TYPE_USER.PATIENT) {
          const { data: otherData } = await lastValueFrom(
            this.patientService.findByUserId(user._id),
          );
          userInfo = { ...user, ...otherData };
        } else {
          return user;
        }
        const { password, __v, verification_code, ...rest } = userInfo;
        return rest;
      }
    }
    return null;
  }

  login(user) {
    const payload = {
      email: user?.email,
      name: user?.name,
      phoneNumber: user?.phoneNumber,
      sub: user?._id,
    };
    return {
      data: {
        token: this.jwtService.sign(payload),
        user,
      },
      statusCode: 200,
    };
  }

  makeToken(payload: any, expiresIn: string) {
    return this.jwtService.sign(payload, { expiresIn });
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
  // async verifyFromGoogle(username:string) {
  //   const {data:user} = await this.userService.login(username);
  //   if (user && user.isResgisteredFromGoogle) {
  //     return user;
  //   }
  //   return null;
  // }

  // async signinFromGoogle(email) {
  //   const {data:user} = await this.verifyFromGoogle(email);
  //   if (user) {
  //    return this.login(user);
  //   }
  //   const {data:userFromService} =  await this.userService.regsiterUserFromGoogle(email).toPromise();

  //   return this.login(userFromService);
  // }
}
