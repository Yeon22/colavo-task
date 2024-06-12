import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetTimeslotRequestDto } from './dto/get-timeslot.request.dto';
import { GetTimeslotResponseDto } from './dto/get-timeslot.response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return 'hello';
  }

  @Post('getTimeSlots')
  async getTimeSlots(
    @Body() body: GetTimeslotRequestDto,
  ): Promise<GetTimeslotResponseDto[]> {
    return this.appService.getTimeSlots(body);
  }
}
