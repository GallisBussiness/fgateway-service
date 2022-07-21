/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
export class UpdateUserPasswordDto {

    @IsString()
    id: string;

    @IsString()
    oldPassword: string;

    @IsString()
    password:string;
}