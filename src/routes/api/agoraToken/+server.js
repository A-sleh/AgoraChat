import pgk from "agora-access-token";
const { RtcTokenBuilder, RtcRole, RtmTokenBuilder, RtmRole } = pgk

import {AGORA_APP_CERTIFICATE} from "$env/static/private"
import { PUBLIC_AGORA_APP_ID } from "$env/static/public"

export async function GET({ url }) {
  const channelName = url.searchParams.get("channelName");
  const userName = url.searchParams.get("userName") || "Unknown";
  const uid = parseInt(url.searchParams.get("uid")) || 0;
  const roleParam = url.searchParams.get("role");

  if (!channelName) {
    return new Response(JSON.stringify({ error: "channel name is required" }), { status: 400 });
  }

  let role = roleParam === "host" ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds + 200000000;

  const token = RtcTokenBuilder.buildTokenWithUid(
    PUBLIC_AGORA_APP_ID,
    AGORA_APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  const tokenRtm = RtmTokenBuilder.buildToken(
    PUBLIC_AGORA_APP_ID,
    AGORA_APP_CERTIFICATE,
    uid.toString(),
    RtmRole.Rtm_User,
    privilegeExpiredTs
  );

  return new Response(JSON.stringify({
    token,
    tokenRtm,
    uid,
    role: roleParam,
    channelName,
    userName,
  }), { headers: { "Content-Type": "application/json" } });
}