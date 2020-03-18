import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { Member } from "./models/member";

module.exports.register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email)
    return res.send({ error: true, message: "Please enter an Email address" });
  if (!password)
    return res.send({ error: true, message: "Please enter a Password" });
  if (!firstName)
    return res.send({ error: true, message: "Please enter your First Name" });
  if (!lastName)
    return res.send({ error: true, message: "Please enter your Last Name" });

  const active = true;
  const salt = bcrypt.genSaltSync(10);
  const encryptedPassword = bcrypt.hashSync(password, salt);
  const registrationDate = new Date(new Date().toUTCString());

  try {
    // Verify email doesn't already exist
    const member = await Member.findOne({ email });
    if (member !== null)
      return res.send({
        error: true,
        message: "The email specified already exists"
      });

    let username =
      firstName.trim().toLowerCase() + "-" + lastName.trim().toLowerCase();
    // strip out non-alpha numeric, dots, hyphens, underscores
    username = username.replace(/  +/g, " ");
    username = username.replace(/\s/g, "-");
    username = username.replace(/[^a-z-0-9.-_]+/gi, "");
    if (username === "") username = "new-member";
    username = await getUniqueUsername(username);

    const newMember = await new Member({
      email,
      username,
      password: encryptedPassword,
      firstName,
      lastName,
      active,
      salt,
      registrationDate
    }).save();

    return res.send({ error: false, member: newMember });
  } catch (err) {
    console.error(err);
  }
};

async function getUniqueUsername(username: string) {
  const members = await Member.find({
    username: { $regex: new RegExp(`^${username}`, "i") }
  });

  if (members) {
    let usernameMatchFound;
    let usernameExists = false;

    do {
      usernameMatchFound = false;

      members.forEach(member => {
        if (member.username === username) {
          usernameMatchFound = true;
          usernameExists = true;
          username = incrementUserName(username);
        }
      });

      if (!usernameMatchFound) {
        usernameExists = false;
      }
    } while (usernameExists);
  }

  return username;
}

function incrementUserName(username: string) {
  if (username.indexOf("-") >= 0) {
    let existingUserName: string[] = username.split("-");
    username = "";

    for (let i = 0; i < existingUserName.length; i++) {
      if (i + 1 < existingUserName.length) {
        username = username + existingUserName[i] + "-";
      } else {
        let parsedInput = parseInt(existingUserName[i]);

        // increment if indecie is a number
        if (isNaN(parsedInput)) {
          username = username + existingUserName[i] + "-1";
        } else {
          username = username + (Number(existingUserName[i]) + 1);
        }
      }
    }

    return username;
  } else {
    return username + "-1";
  }
}
