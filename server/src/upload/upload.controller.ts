import { Body, Controller, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService,
    private readonly authService: AuthService
  ) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'background', maxCount: 1 },
      { name: 'avatar', maxCount: 1 },
    ],
    UploadService.getMulterConfig()
  ))
  async uploadFile(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] },
    @Body() body: { username: string }, @Req() req) {
    const userId = req.user.userId
    const avatarPath = files.avatar ? `/uploads/${files.avatar[0].filename}` : null;
    const backgroundPath = files.background ? `/uploads/${files.background[0].filename}` : null;

      const image = {
        background: backgroundPath,
        avatar: avatarPath,
      }
    const res = await this.authService.updateUser({
      image:image,
      username: body.username,
    }, userId)
    if(!res){
      throw new Error('User not found');
    }

    return {
      username: body.username,
      avatar: avatarPath,
      background: backgroundPath,
    };
  }
}
