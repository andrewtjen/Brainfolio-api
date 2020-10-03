import { Controller , Get, Post, Put, Delete, Body, Param, ValidationPipe } from '@nestjs/common';
import { EducationDto } from './dto/education.dto';
import { EducationService } from './education.service'
import { Education } from './interfaces/education.interface'

@Controller('education')
export class EducationController {
    constructor(private readonly educationService: EducationService){}
    // portfolio id missing
    // @Get()
    // findAll(): Promise<Education[]> {
    //     return this.educationService.findAll();
    // } 

    @Get(':id')
    findOne(@Param() param): Promise<Education> {
        return this.educationService.findOne(param.id);
    }

    @Post()
    create(@Body(ValidationPipe) createProjectDto: EducationDto): Promise<Education> {
        return this.educationService.create(createProjectDto);
    }

    @Delete(':id')
    delete(@Param() param): Promise<Education> {
        return this.educationService.delete(param.id);
    }

    @Put(':id')
    update(@Body() updateItemDto: Education, @Param() param): Promise<Education> {
        return this.educationService.update(param.id,updateItemDto);
    }

}
