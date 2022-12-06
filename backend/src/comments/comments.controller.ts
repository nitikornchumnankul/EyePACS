import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Comments } from './comments.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(
        private commentsService: CommentsService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post(':eye_photo_id/create')
    createComment(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() createCommentDto: CreateCommentDto,
    ): Promise<Comments> {
        return this.commentsService.createComment(eye_photo_id, createCommentDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update')
    updateComment(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() editCommentDto: EditCommentDto,
    ): Promise<Comments> {
        return this.commentsService.updateComment(eye_photo_id, editCommentDto)
    }

    @Get(':eye_photo_id/get')
    getComment(
        @Param('eye_photo_id') eye_photo_id: string,
    ): Promise<Comments> {
        return this.commentsService.getComment(eye_photo_id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':eye_photo_id/delete')
    deleteComment(
        @Param('eye_photo_id') eye_photo_id: string
    ): Promise<string> {
        return this.commentsService.deleteComment(eye_photo_id)
    }
}