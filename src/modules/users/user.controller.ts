import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // Create a new user
    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    // Get all users
    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    // Get a user by ID
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findById(@Param('id') id: string): Promise<User> {
        const user = await this.userService.findById(parseInt(id, 10));
        if(!user) {
          throw new NotFoundException('User not found');
        }
        return user;
    }

    // Get a user by username
    @Get('username/:username')
    @UseGuards(JwtAuthGuard)
    async findByUsername(@Param('username') username: string): Promise<User> {
        const user = await this.userService.findByUsername(username);
        if(!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    // Get a user by email
    @Get('email/:email')
    @UseGuards(JwtAuthGuard)
    async findByEmail(@Param('email') email: string): Promise<User> {
        const user = await this.userService.findByEmail(email);
        if(!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    // Update a user
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.update(parseInt(id, 10), updateUserDto);
    }

    // Delete a user
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: string): Promise<void> {
        return this.userService.remove(parseInt(id, 10));
    }
}