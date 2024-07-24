import { Alert } from "react-native";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.craftnsolve.aora",
  projectId: "669ab8b00038bed35a44",
  databaseId: "669abbd30008d74e717a",
  userCollectionId: "669abbfc002b056400a4",
  videoCollectionId: "669abc4a00158b2ff37a",
  storageId: "669abfdb0038013327a7",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {
  console.log(email, password, username, "GONORREA");
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    console.log("newUser", newUser);
    return newUser;
  } catch (error) {
    console.log(error);
    console.log("Error in create user");

    throw new Error(error);
  }
};

export async function signIn(email, password) {
  console.log(email, password, "LOGIN");
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log("Error in session SIGNIN");
    console.log(error);
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    console.log("ACCOUNT", currentAccount);
    if (!currentAccount) throw new Error("No user");
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    console.log("ACCOUNT CURR",currentAccount.$id)


    if (!currentUser) {
      console.log("No current user");
      throw Error;
    }
console.log("**************************",currentUser.documents)
    return currentUser.documents[0];
  } catch (error) {
    console.log(error, "Error in getCurrentUser");
    throw error;
  }
}
