import { VulcanSchema, VulcanDocument } from "@vulcanjs/schema";
import SimpleSchema from "simpl-schema";
import {
  buildDefaultMutationResolvers,
  buildDefaultQueryResolvers,
  createGraphqlModel,
  // VulcanGraphqlModel,
} from "@vulcanjs/graphql";
import { createMongooseConnector } from "@vulcanjs/mongo";

const schema: VulcanSchema = {
  _id: {
    type: String,
    optional: true,
    canRead: ["guests"],
  },
  userId: {
    type: String,
    optional: true,
    canRead: ["guests"],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ["admins"],
    onCreate: () => {
      return new Date();
    },
  },
  username: {
    type: String,
    optional: true,
    canRead: ["guests"],
    canUpdate: ["owners", "admins"],
    canCreate: ["owners"],
    searchable: true,
  },
  isAdmin: {
    type: Boolean,
    label: "Admin",
    input: "checkbox",
    optional: true,
    canCreate: ["admins"],
    canUpdate: ["admins"],
    canRead: ["guests"],
  },
  email: {
    type: String,
    optional: false,
    regEx: SimpleSchema.RegEx.Email,
    // mustComplete: true,
    input: "text",
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    canRead: ["owners", "admins"],
    searchable: true,
    unique: true,
    // unique: true // note: find a way to fix duplicate accounts before enabling this
  }
};

export interface CustomUserType extends VulcanDocument {
  username: string,
  isAdmin: Boolean,
  email: String
}

const name = "CustomUser" // Change this value when creating your own model
const typeName = name
const multiTypeName = "CustomUsers" // Change this value when creating your own model
export const CustomUser = createGraphqlModel({
  name: "CustomUser",
  schema,
  graphql: {
    typeName,
    multiTypeName,
    queryResolvers: buildDefaultQueryResolvers({ typeName }),
    mutationResolvers: buildDefaultMutationResolvers({
      typeName,
    }),
  },
  permissions: {
    canCreate: ["guests"],
    canUpdate: ["owners", "admins"],
    canDelete: ["owners", "admins"],
    canRead: ["members", "admins"],
  },
});

export const CustomUserConnector = createMongooseConnector<CustomUserType>(
  CustomUser
);
