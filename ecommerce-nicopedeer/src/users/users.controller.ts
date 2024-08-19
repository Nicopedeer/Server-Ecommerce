import { Controller, Get, Param, Put, Body, Post, HttpCode, Delete, UseGuards, UseInterceptors, Query, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from 'src/Dto/createUser.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RemovePasswordInterceptor } from 'src/interceptors/removePassword.interceptor';
import { ChangePasswordDto } from 'src/Dto/changePassword.dto';
import { hideAdminInterceptor } from 'src/interceptors/hideAdmin.interceptor';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from './roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { updateUserDto } from 'src/Dto/updateUser.dto';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBearerAuth()
  @Get()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(RemovePasswordInterceptor)
  getUsers(@Query('page') page:string, @Query('limit') limit: string) {
    !page ? page = '1' : page;
    !limit ? limit = '5' : limit
    return this.usersService.getUsers(Number(page),Number(limit));
  }
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(RemovePasswordInterceptor)
  @UseInterceptors(hideAdminInterceptor)
  async getUserById(@Param('id', ParseUUIDPipe) id: string ) {
    return  await this.usersService.getUserById(id);
  }
  @ApiBearerAuth()
  @Put('/update/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UseInterceptors(hideAdminInterceptor)
  @UseInterceptors(RemovePasswordInterceptor)
  updateUser(@Param('id',ParseUUIDPipe )  id: string, @Body() user : updateUserDto){
    const userUpdated = this.usersService.updateUser(id, user)
    return userUpdated
  }
  @ApiBearerAuth()
  @Put('/changePassword/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @UseInterceptors(RemovePasswordInterceptor)
  @UseInterceptors(hideAdminInterceptor)
  async updatePassword(@Param('id', ParseUUIDPipe)id: string, @Body() credentials : ChangePasswordDto){
    const passwordChanged = await this.usersService.updatePassword(id, credentials)
    return passwordChanged
  }
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(RemovePasswordInterceptor)
  @UseInterceptors(hideAdminInterceptor)
  deleteUser(@Param('id', ParseUUIDPipe) id: string){
    const userDeleted = this.usersService.deleteUser(id)
    return userDeleted
  }
}