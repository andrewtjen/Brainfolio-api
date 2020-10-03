import { Document } from 'mongoose';

export interface Education extends Document{
    portfolioId: string;
    startDate: string;
    endDate: string;
    degree: string;
    institution: string;
    location: number;
    score: string;
}


// @Prop()
// portfolioId: String;

// @Prop({ required: true })
// startDate: string;

// @Prop({ required: true })
// endDate : string;

// @Prop({ required: true })
// degree: string;

// @Prop({ required: true })
// institution: string;

// @Prop({ required: false })
// location: string;

// @Prop({ required: false })
// score: string;