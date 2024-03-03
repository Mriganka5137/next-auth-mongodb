"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/database/mongo.config";
import { User } from "@/database/models/user.model";

connectToDatabase();

export const registerUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validation = RegisterSchema.safeParse(values);
  if (!validation.success) {
    return { error: "Invalid credentials!" };
  }

  const { email, password, name } = validation.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return { error: "Email already in use!" };
  }
};
