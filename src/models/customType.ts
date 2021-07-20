import { VulcanSchema, VulcanDocument } from "@vulcanjs/schema";
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
  guestReadableField: {
    type: String,
    optional: true,
    canRead: ["guests"],
    canUpdate: ["admins"],
    canCreate: ["owners", "admins"],
  },
  membersReadableField: {
    type: String,
    optional: true,
    canRead: ["members"],
    canUpdate: ["admins"],
    canCreate: ["owners", "admins"],
  },
  adminsReadableField: {
    type: String,
    optional: true,
    canRead: ["admins"],
    canUpdate: ["admins"],
    canCreate: ["owners"],
  },
  guestCreatableField: {
    type: String,
    optional: true,
    canRead: ["admins"],
    canUpdate: ["admins"],
    canCreate: ["guests"],
  },
  membersCreatableField: {
    type: String,
    optional: true,
    canRead: ["admins"],
    canUpdate: ["admins"],
    canCreate: ["members"],
  },
  adminsCreatableField: {
    type: String,
    optional: true,
    canRead: ["admins"],
    canUpdate: ["admins"],
    canCreate: ["admins"],
  },
  guestUpdatableField: {
    type: String,
    optional: true,
    canRead: ["admins"],
    canUpdate: ["guests"],
    canCreate: ["admins"],
  },
  membersUpdatableField: {
    type: String,
    optional: true,
    canRead: ["admins"],
    canUpdate: ["members"],
    canCreate: ["admins"],
  },
  adminsUpdatableField: {
    type: String,
    optional: true,
    canRead: ["admins"],
    canUpdate: ["admins"],
    canCreate: ["admins"],
  },
  dateField: {
    type: Date,
    optional: true,
    canRead: ["guests"],
    canUpdate: ["guests"],
    canCreate: ["guests"],
  },
  numberField: {
    type: Number,
    optional: true,
    canRead: ["guests"],
    canUpdate: ["guests"],
    canCreate: ["guests"],
  },
};

export interface CustomTypeType extends VulcanDocument {
  guestReadableField: string;
  membersReadableField: string;
  adminsReadableField: string;
  guestCreatableField: string;
  membersCreatableField: string;
  adminsCreatableField: string;
  guestUpdatableField: string;
  membersUpdatableField: string;
  adminsUpdatableField: string;
}

const name = "CustomType" // Change this value when creating your own model
const typeName = name
const multiTypeName = "CustomsType" // Change this value when creating your own model
export const CustomType = createGraphqlModel({
  name: "CustomType",
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
    canCreate: ["member", "admins"],
    canUpdate: ["owners", "admins"],
    canDelete: ["owners", "admins"],
    canRead: ["members", "admins"],
  },
});

export const CustomTypeConnector = createMongooseConnector<CustomTypeType>(
  CustomType
);
