import { Document, SchemaOptions, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { Socket as SockeModel } from './sockets.model';

const options: SchemaOptions = {
  id: false,
  collection: 'chattings',
  timestamps: true,
};

@Schema(options)
export class Chatting extends Document {
  @Prop({
    type: {
      _id: { type: Types.ObjectId, required: true, ref: 'sockets' },
      id: { type: String }, //socket.id 값 $
      username: { type: String, required: true },
    },
  })
  @IsNotEmpty()
  @IsString()
  user: SockeModel;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  chat: string;
}
export const ChattingSchema = SchemaFactory.createForClass(Chatting);
