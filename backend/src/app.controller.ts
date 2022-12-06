import { Body, Controller, Delete, Get, Param, Post, Request, StreamableFile, UseGuards, Response, Res } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local/local-auth.guard';
import { RegisterDto } from './users/dto/register.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private appService: AppService,
  ) {}

  @Post('register')
  register(
    @Body() registerDto: RegisterDto
  ): Promise<any> {
    return this.usersService.register(registerDto)
  }

  @Get('eye-data')
  async exportToCSV(@Response({ passthrough: true }) res): Promise<StreamableFile> {
    const results = await this.appService.exportToCSV()
    const file = createReadStream(join(`${process.cwd()}/export`, results))
    res.set({
      'Content-Disposition': `attachment; filename="${Date.now()}_eye_data.csv"`,
    })
    return new StreamableFile(file)
  }
  
  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './retina' });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: any
  ): Promise<any> {
    return this.authService.login(req.user)
  }

  // Delete all
  @UseGuards(JwtAuthGuard)
  @Delete('delete-all-table/:eye_photo_id')
  deleteAllTable(
    @Param('eye_photo_id') eye_photo_id: string
  ): Promise<string> {
    return this.appService.deleteAllTable(eye_photo_id)
  }
}
