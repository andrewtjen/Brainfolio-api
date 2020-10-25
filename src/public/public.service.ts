import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Education } from '../portfolio/components/education/interfaces/education.interface';
import { Experience } from '../portfolio/components/experience/interfaces/experience.interface';
import { Profile } from '../portfolio/components/profile/interfaces/profile.interface';
import { Skills } from '../portfolio/components/skills/interfaces/skills.interface';
import { Project } from '../projects/interfaces/project.interface';
import * as admin from 'firebase-admin';

@Injectable()
export class PublicService {

    constructor(
        @InjectModel('Project') private readonly projectModel: Model<Project>,
        @InjectModel('Skills') private readonly skillsModel: Model<Skills>,
        @InjectModel('Experience') private readonly experienceModel: Model<Experience>,
        @InjectModel('Education') private readonly educationModel: Model<Education>,
        @InjectModel('Profile') private readonly profileModel: Model<Profile>
    ) {}



    async getFileNameAndLink(fileNames, username, _id) {

        var fileNameAndLink = [];
        var bucket = admin.storage().bucket();
        const config = {
            action: "read" as const,
            expires: Date.now() + 1000 * 60 * 5, // 5 minutes
        };
 
        for(let fileName of fileNames){
            var fileNamePath = username + '/projects/' + _id + '/'+ fileName;
            var file = bucket.file(fileNamePath);
            var url = await file.getSignedUrl(config) 
            url.unshift(fileName)
            fileNameAndLink.push(url);
        }

        return fileNameAndLink;
    }


    async findAllProject(username:string): Promise<Project[]> {
        return await this.projectModel.find({username:username, isPublic:true}).exec();
    }
    async findProject(username:string, id:string): Promise<Project> {
        const projectModel = await this.projectModel.findOne({username:username, isPublic:true, _id:id}).exec();
        var fileNames = projectModel.projectFileName;
        let _id = projectModel._id;
        // Grab filename and Link to access
        try{
            projectModel.projectFileName = await this.getFileNameAndLink(fileNames, username, _id);
            return projectModel;
        }catch(e){
            throw new Error("Mongoose Error" + e)
        }

    }
    async findSkills(username:string): Promise<Skills[]> {
        try{
            return await this.skillsModel.find({username : username}).exec();
        }catch(e){
            throw new Error("Mongoose Error" + e)
        }
        
    }
    async findProfile(username:string): Promise<Profile> {
        try{
            return await this.profileModel.findOne({username : username}).exec();
        }catch(e){
            throw new Error("Mongoose Error" + e)
        }
        
    }
    async findExperience(username:string): Promise<Experience[]> {
        try{
            return await this.experienceModel.find({username:username}).exec();
        }catch(e){
            throw new Error("Mongoose Error" + e)
        }
        
    }
    async findEducation(username:string): Promise<Education[]> {
        try{
            return await this.educationModel.find({username:username}).exec();
        }catch(e){
            throw new Error("Mongoose Error" + e)
        }
        
    }

    async portfolioIsPublic(username:string) {
        try{
            const model = await this.profileModel.findOne({username : username}).exec();
            if(model){
                return false;
            }else{
                return model.isPublic
            }
        }catch(e){
            throw new Error("Mongoose Error" + e)
        }

    }




}