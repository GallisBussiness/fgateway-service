import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PaytechService } from './paytech.service';

@Module({
  imports: [HttpModule],
  providers: [PaytechService],
  exports: [PaytechService],
})
export class PaytechModule {}
