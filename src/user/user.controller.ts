/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  BadRequestException,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ROLES } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { catchError, from, Observable, lastValueFrom } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { AuthService } from 'src/auth/auth.service';
import { throwResponse } from 'src/utils/throw-response';
import { ValidateUserDto } from './dto/validate-user-dto';
import { UpdateUserPasswordDto } from './dto/update_user_password.dto';
import * as bcrypt from 'bcryptjs';
import { hashFromRequest } from 'src/utils/hash-from-request';
import { LoginUserDto } from './dto/login-user-dto';
import { MailService } from 'src/mail/mail.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private mailService: MailService,
  ) {}

  @HttpCode(200)
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req): Promise<ResponseServiceInterface> {
    return this.authService.login(req.user);
  }

  @Post('login/admin')
  async loginAdmin(@Body() info: LoginUserDto): Promise<ResponseServiceInterface> {
    const {data: user } = await this.userService.login(info.username);
    if(user !== null) {
      if(user.role !== ROLES.SUPER_ADMIN ) throw new UnauthorizedException();
      const isMatch = await bcrypt.compare(info.password, user.password);
      if(isMatch) return this.authService.login(user);
    }
    throw new UnauthorizedException()
  }

  @Post('forgotpassword')
  async forgotPasswrd(@Body() dto: {username: string} ) {
   
      const {data: user} = await this.userService.login(dto.username);
      if(user) { 
       const token = this.authService.makeToken({username: dto.username,id:user._id},'15m');
       await this.userService.update(user?._id,{ resetPasswordToken:token});
       const resetlink = `http://localhost:3000/reset-password/${user?._id}/${token}`;
       const mes = `
       Vous recevez ce mail car vous avez demandé à ce que votre mot de passe d'accès à la plateforme Freedocteur soit réinitialisé.
      Vous pouvez utiliser ce lien ${resetlink} pour le réinitialiser.
      Vous pouvez juste ignorer ce mail si vous ne souhaitez pas réinitialiser votre mot de passe
      L'équipe Freedocteur
       `;
       await this.mailService.sendMail(dto.username, mes ,'Réinitialisation de Mot de Passe');
       return {data: true, status: 200};
      }
    return {data: false, status: 500};
  }

  @Post('resetpassword')
  async resetPasswrd(@Body() dto: {password: string,id: string,token: string} ) {
    try {
      const {data: user} = await lastValueFrom(this.userService.findOne(dto.id));
      if(user) {
        if(user.resetPasswordToken = dto.token) {
          if(this.authService.verifyToken(dto.token)) {
            const {password: nwPass} = await hashFromRequest(dto);
            return await this.userService.update(dto.id, {password: nwPass});
          }
          throw new Error('token expired !')
        }
        throw Error('token Invalid !')
      } else {
          throw Error('User Invalid')
      }
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }

  @Post('validate')
  validate(
    @Body() validateUserDto: ValidateUserDto,
  ): Observable<ResponseServiceInterface> {
    return from(this.userService.validate(validateUserDto));
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return result.pipe(
      catchError(throwResponse),
    );
  }

  @Post('admin/superadmin')
  async createSuperAdmin(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.createSuperAdmin(createUserDto);
    return result.pipe(
      catchError(throwResponse),
    );
  }

  @Get()
  // @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.userService.findAll().pipe(
      catchError(throwResponse),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id).pipe(
      catchError(throwResponse),
    );
  }

  //@UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto).pipe(
      catchError(throwResponse),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/update_password')
  async updatePassword(@Body() updateUserPasswordDto: UpdateUserPasswordDto) {

    const {id,oldPassword,password} = updateUserPasswordDto;
    // je recupere le user
    const {data:user}  = await lastValueFrom(this.userService.findOne(id))
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    // je teste le mot de passe actuel si c le bon
   if(isMatch) {
     const o = await hashFromRequest({password})
      return this.userService.update(id,o).pipe(
   );
   }
   else {
     throw new BadRequestException();
   }
  
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get('check/ifadmin')
   ifAdmin(): Observable<boolean> {
   return this.userService.ifadmin();
  }
}
