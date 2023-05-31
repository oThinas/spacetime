/* eslint-disable camelcase */
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import axios from 'axios';

import { prisma, app } from '../lib';
import { errorHandler } from '../middlewares';


async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({ code: z.string() });
  const userSchema = z.object({
    id: z.number(),
    login: z.string(),
    name: z.string(),
    avatar_url: z.string().url(),
  });

  try {
    const { code } = bodySchema.parse(request.body);

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: { Accept: 'application/json' },
      },
    );

    const { access_token } = accessTokenResponse.data;
    const userResponse = await axios.get('https://api.github.com/user', { headers: { Authorization: `Bearer ${access_token}` } });
    const userRawData = userSchema.parse(userResponse.data);
    const userInfo = {
      id: userRawData.id,
      login: userRawData.login,
      name: userRawData.name,
      avatarUrl: userRawData.avatar_url,
    };

    let user = await prisma.user.findUnique({ where: { githubId: userInfo.id } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          login: userInfo.login,
          name: userInfo.name,
          avatarUrl: userInfo.avatarUrl,
        },
      });
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: '30 days',
      },
    );

    return reply.send({ token });
  } catch (error) {
    errorHandler(reply, error);
  }
}

export const authController = { register };
