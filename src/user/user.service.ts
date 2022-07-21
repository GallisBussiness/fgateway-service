import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ResponseServiceInterface } from 'src/ResponseServiceInterface';
import { CreateUserDto, STATUS_USER } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { lastValueFrom, Observable, tap } from 'rxjs';
import { hashFromRequest } from 'src/utils/hash-from-request';
import { ValidateUserDto } from './dto/validate-user-dto';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private user: ClientProxy) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto = await hashFromRequest(createUserDto);
    return this.user.send<string, CreateUserDto>('createUser', createUserDto);
  }

  ifadmin() {
    return this.user.send<boolean, string>('ifadmin', '');
  }

  async createSuperAdmin(createUserDto: CreateUserDto) {
    createUserDto = await hashFromRequest(createUserDto);
    return this.user.send<string, CreateUserDto>(
      'createSuperAdmin',
      createUserDto,
    );
  }

  login(username: string): Promise<ResponseServiceInterface> {
    return new Promise((resolve, reject) => {
      this.user
        .send<ResponseServiceInterface, string>('login', username)
        .subscribe(
          (d) => resolve(d),
          (err) => reject(err),
        );
    });
  }

  async validate(
    validateUserDto: ValidateUserDto,
  ): Promise<ResponseServiceInterface> {
    const { data: user } = await lastValueFrom(
      this.findOne(validateUserDto.id),
    );
    if (user?.verification_code === validateUserDto.verification_code)
      return lastValueFrom(
        this.update(validateUserDto.id, {
          status: STATUS_USER.ACTIVATE,
        }),
      );

    throw new HttpException({ message: 'validate fail', statusCode: 500 }, 500);
  }

  findAll() {
    return this.user.send<ResponseServiceInterface, string>('findAllUser', '');
  }

  findOne(id: string) {
    return this.user.send<ResponseServiceInterface, string>('findOneUser', id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const updateObj = { ...updateUserDto, id };
    return this.user.send<ResponseServiceInterface, UpdateUserDto>(
      'updateUser',
      updateObj,
    );
  }

  remove(id: string): Observable<ResponseServiceInterface> {
    return this.user
      .send<ResponseServiceInterface, string>('removeUser', id)
      .pipe(tap((res) => console.log(res)));
  }

  sendMail(mailDto: {
    to: string;
    message: string;
  }): Observable<ResponseServiceInterface> {
    return this.user.send<
      ResponseServiceInterface,
      { to: string; message: string }
    >('sendMailNotification', mailDto);
  }
}
