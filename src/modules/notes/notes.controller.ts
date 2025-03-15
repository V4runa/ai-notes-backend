import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { Note } from "./notes.entity";
import { TagsService } from "../tags/tags.service";
import { Tag } from "../tags/tags.entity";

@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly tagsService: TagsService,
  ) {}

  // Create a new note
  @Post()
  async createNote(
    @Body('userId') userId: number, 
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('tagIds') tagIds: number[],
  ): Promise<Note> {
    // Fetch the tags
    const tags = await this.tagsService.getAllTags();
    const noteTags = tags.filter((tag) => tagIds.includes(tag.id));
    
    // Check if all tags exist
    if (noteTags.length !== tagIds.length) {
      throw new Error('Some of the provided tag IDs do not exist');
    }
    
    // Create the note for the user
    return this.notesService.createNote(title, content, noteTags, userId);
  }

  // Get all notes for a user
  @Get('user/:userId')
  async getNotesByUser(@Param('userId') userId: number): Promise<Note[]> {
    return this.notesService.getNotesByUser(userId);
  }

  // Get a single note by ID
  @Get(':id')
  async getNoteById(@Param('id') id: number): Promise<Note> {
    return this.notesService.getNoteById(id);
  }

  // Update a note
  @Put(':id')
  async updateNote(
    @Param('id') id: number,
    @Body() noteData: Partial<Note>,
    @Body('tagIds') tagIds: number[],
  ): Promise<Note> {
    // Fetch the tags
    const tags = await this.tagsService.getAllTags();
    const noteTags = tags.filter((tag) => tagIds.includes(tag.id));
    
    // Check if all tags exist
    if (noteTags.length !== tagIds.length) {
      throw new Error('Some of the provided tag IDs do not exist');
    }
    
    // Update the note
    return this.notesService.updateNote(id, { ...noteData, tags: noteTags });
  }

  // Delete a note
  @Delete(':id')
  async deleteNote(@Param('id') id: number): Promise<void> {
    return this.notesService.deleteNote(id);
  }
}
