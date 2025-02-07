import { z } from "zod";
import { FriendshipStatusEnum } from "../enum";

export const RequestFriendshipValid = z.object({
  username: z
    .string()
    .regex(
      /^[a-z0-9_]{3,15}$/,
      "should be between 3-15 characters and can only contain numbers, letters, and underscores.",
    ),
});

export const getChatsQueryValid = z.object({
  friendshipId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      "should be a valid UUID.",
    ),
});

export const CheckFriendshipValid = z.object({
  friendshipId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      "should be a valid UUID.",
    ),
});

export const PutStatusValid = z.object({
  friendshipId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      "should be a valid UUID.",
    ),
  friendshipStatus: z.nativeEnum(FriendshipStatusEnum),
});

export const GetFriendships = z.object({
  limit: z.number().int().optional(),
  offset: z.number().int().optional(),
  friendshipStatus: z.nativeEnum(FriendshipStatusEnum),
});

export const GetFriendPubKey = z.object({
  friendId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      "should be a valid UUID.",
    ),
});
