import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tag } from "./tags.entity";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";
import { NotesModule } from "../notes/notes.module";
import { UserModule } from "../users/user.module";
@Module({
  imports: [
    TypeOrmModule.forFeature([Tag]),
    forwardRef(() => NotesModule),
    UserModule,
  ],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
