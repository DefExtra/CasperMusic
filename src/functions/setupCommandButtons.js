"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCommandButtons = void 0;
const emojis = require("../../config.json").emojis;
const discord_js_1 = require("discord.js");
const superQuick_1 = require("./superQuick");
const node_fetch_1 = __importDefault(require("node-fetch"));
const quick_db_1 = __importDefault(require("quick.db"));
function bar(position, duration) {
  return __awaiter(this, void 0, void 0, function* () {
    let deg = position / duration;
    let done = Math.round(20 * deg);
    let notDone = 20 - done;
    let progressText = emojis.doneBlock.repeat(done);
    let emptyProgressText = emojis.dinotdoneBlock.repeat(notDone);
    let Bar = progressText + emptyProgressText;
    return Bar;
  });
}
function deg(position, duration) {
  return __awaiter(this, void 0, void 0, function* () {
    let deg = position / duration;
    let runningDeg = Math.round(deg * 100) + emojis.presentage;
    return runningDeg;
  });
}

var ier;
async function msgEditor(player, client, _g, content, tracker) {
  if (!player) return;
  let track = tracker || player?.queue?.current;
  if (!track) return;
  let thumbnail =
    (
      await require("node-fetch").default(
        track?.displayThumbnail("maxresdefault")
      )
    ).statusText == "OK"
      ? track?.displayThumbnail("maxresdefault")
      : require("../../config.json").images.quickPlay;
  let Embed = new discord_js_1.MessageEmbed()
    .setColor("#4458F7")
    .setTitle(track?.title || "")
    .setDescription(
      "Duration: " +
        (await bar(player?.position || 0, track?.duration || 0)) +
        " " +
        (await deg(player?.position || 0, track?.duration || 0))
    )
    .setImage(thumbnail)
    .setFooter({
      text: `${player?.queue?.size} songs in queue | volume: ${player?.volume}% | loop: ${player?.trackRepeat} | paused: ${player?.paused}`,
      iconURL: client.user?.avatarURL({ dynamic: true }) || "",
    });

  ier = setInterval(async () => {
    if (_g.embeds[0].title !== player?.queue?.current?.title)
      msgEditor(
        client.manager.players.get(_g.guildId),
        client,
        _g,
        content,
        tracker
      );
  }, 2500);
  if (content && content !== null)
    _g.edit({ embeds: [Embed], content: content });
  else
    _g.edit({
      embeds: [Embed],
      content: `**__Queue list__**:\n${
        player === null || player === void 0
          ? void 0
          : player.queue.map((v, i) => `${i}. ${v.title}`).join("\n")
      }`,
    });
}

/**
 *
 * @param {discord_js_1.CommandInteraction} interaction
 */

function setupCommandButtons(interaction, client) {
  var _a;
  return __awaiter(this, void 0, void 0, function* () {
    if (interaction.isButton()) yield interaction.deferUpdate().catch(() => {});
    if (interaction.isSelectMenu())
      yield interaction.deferUpdate().catch(() => {});
    let player =
      (_a = client.manager) === null || _a === void 0
        ? void 0
        : _a.players.get(interaction.guildId || "");
    if (!player) return;
    let track =
      player === null || player === void 0 ? void 0 : player.queue.current;
    if (!track) return;
    var _b,
      _c,
      _d,
      _e,
      _f,
      _g,
      _h,
      _j,
      _k,
      _l,
      _m,
      _o,
      _p,
      _q,
      _r,
      _s,
      _t,
      _u,
      _v,
      _w,
      _x,
      _y,
      _z,
      _0,
      _1,
      _2,
      _3,
      _4,
      _5,
      _6,
      _7,
      _8,
      _9,
      _10,
      _11,
      _12,
      _13,
      _14,
      _15,
      _16,
      _17,
      _18,
      _19,
      _20,
      _21,
      _22,
      _23,
      _24,
      _25,
      _26,
      _27;
    switch (interaction.customId) {
      case "filters": {
        if (interaction.isSelectMenu()) {
          if (
            interaction.member?.voice?.channelId !==
            interaction.guild?.me.voice?.channelId
          )
            return;
          let check = yield (0, superQuick_1.superQuickPlayingCheck)(
            client,
            interaction
          );
          let check2 = yield (0, superQuick_1.superQuickVoiceCheck)(
            interaction
          );
          let realCheck = yield (0, superQuick_1.superQuickTrueOrFalseCheck)(
            check,
            check2
          );
          if (realCheck == true) {
            yield player.reset();
            setTimeout(async () => {
              if (interaction.values[0] !== "reset")
                player[interaction.values[0]] = true;
            }, 1333);
          }
        }
      }
      case "casper_play_pause":
        {
          if (
            interaction.member?.voice?.channelId !==
            interaction.guild?.me.voice?.channelId
          )
            return;
          let check = yield (0, superQuick_1.superQuickPlayingCheck)(
            client,
            interaction
          );
          let check2 = yield (0, superQuick_1.superQuickVoiceCheck)(
            interaction
          );
          let realCheck = yield (0, superQuick_1.superQuickTrueOrFalseCheck)(
            check,
            check2
          );
          if (realCheck == true) {
            if (player === null || player === void 0 ? void 0 : player.paused)
              player === null || player === void 0
                ? void 0
                : player.pause(false);
            else
              player === null || player === void 0
                ? void 0
                : player.pause(true);

            (_g = yield (_f = interaction.channel) === null || _f === void 0
              ? void 0
              : _f.messages.fetch(interaction.message.id)) === null ||
            _g === void 0
              ? void 0
              : msgEditor(player, client, _g).catch(() => {});
          }
        }
        break;
      case "casper_stop":
        if (
          interaction.member?.voice?.channelId !==
          interaction.guild?.me.voice?.channelId
        )
          return;
        let check = yield (0, superQuick_1.superQuickPlayingCheck)(
          client,
          interaction
        );
        let check2 = yield (0, superQuick_1.superQuickVoiceCheck)(interaction);
        let realCheck = yield (0, superQuick_1.superQuickTrueOrFalseCheck)(
          check,
          check2
        );
        if (realCheck == true) {
          player === null || player === void 0 ? void 0 : player.destroy();
          quick_db_1.default.set(`LastTrack_${interaction.guildId}`, null);
          let Embed = new discord_js_1.MessageEmbed()
            .setColor("#4458F7")
            .setTitle(`**No song playing currently**`)
            .setDescription("Casper is a scary toune for your server.")
            .setFooter({
              text: "all the bot commands woking with slashcommands or the normal prefix",
            })
            .setImage(require("../../config.json").images.quickPlay);
          clearInterval(ier);
          (_j = yield (_h = interaction.channel) === null || _h === void 0
            ? void 0
            : _h.messages.fetch(interaction.message.id)) === null ||
          _j === void 0
            ? void 0
            : _j.edit({
                content:
                  "**__Queue list__**:\nJoin a voice channel and queue songs by name or url in here.",
                embeds: [Embed],
              });
        }
        break;
      case "casper_volume_up":
        {
          if (
            interaction.member?.voice?.channelId !==
            interaction.guild?.me.voice?.channelId
          )
            return;
          let check = yield (0, superQuick_1.superQuickPlayingCheck)(
            client,
            interaction
          );
          let check2 = yield (0, superQuick_1.superQuickVoiceCheck)(
            interaction
          );
          let realCheck = yield (0, superQuick_1.superQuickTrueOrFalseCheck)(
            check,
            check2
          );
          if (realCheck == true) {
            let vol =
              player === null || player === void 0 ? void 0 : player.volume;
            player === null || player === void 0
              ? void 0
              : player.setVolume(vol + 10);
            clearInterval(ier);
            (_q = yield (_p = interaction.channel) === null || _p === void 0
              ? void 0
              : _p.messages.fetch(interaction.message.id)) === null ||
            _q === void 0
              ? void 0
              : msgEditor(player, client, _q).catch(() => {});
          }
        }
        break;
      case "casper_volume_down":
        {
          if (
            interaction.member?.voice?.channelId !==
            interaction.guild?.me.voice?.channelId
          )
            return;
          let check = yield (0, superQuick_1.superQuickPlayingCheck)(
            client,
            interaction
          );
          let check2 = yield (0, superQuick_1.superQuickVoiceCheck)(
            interaction
          );
          let realCheck = yield (0, superQuick_1.superQuickTrueOrFalseCheck)(
            check,
            check2
          );
          if (realCheck == true) {
            let vol =
              player === null || player === void 0 ? void 0 : player.volume;
            player === null || player === void 0
              ? void 0
              : player.setVolume(vol - 10);
            clearInterval(ier);
            (_w = yield (_v = interaction.channel) === null || _v === void 0
              ? void 0
              : _v.messages.fetch(interaction.message.id)) === null ||
            _w === void 0
              ? void 0
              : msgEditor(player, client, _w).catch(() => {});
          }
        }
        break;
      case "casper_loop":
        {
          if (
            interaction.member?.voice?.channelId !==
            interaction.guild?.me.voice?.channelId
          )
            return;
          let check = yield (0, superQuick_1.superQuickPlayingCheck)(
            client,
            interaction
          );
          let check2 = yield (0, superQuick_1.superQuickVoiceCheck)(
            interaction
          );
          let realCheck = yield (0, superQuick_1.superQuickTrueOrFalseCheck)(
            check,
            check2
          );
          if (realCheck == true) {
            if (
              player === null || player === void 0 ? void 0 : player.trackRepeat
            )
              player === null || player === void 0
                ? void 0
                : player.setTrackRepeat(false);
            else
              player === null || player === void 0
                ? void 0
                : player.setTrackRepeat(true);
            clearInterval(ier);
            (_2 = yield (_1 = interaction.channel) === null || _1 === void 0
              ? void 0
              : _1.messages.fetch(interaction.message.id)) === null ||
            _2 === void 0
              ? void 0
              : msgEditor(player, client, _2).catch(() => {});
          }
        }
        break;
      case "casper_seek_back":
        {
          if (
            interaction.member?.voice?.channelId !==
            interaction.guild?.me.voice?.channelId
          )
            return;
          let check = yield (0, superQuick_1.superQuickPlayingCheck)(
            client,
            interaction
          );
          let check2 = yield (0, superQuick_1.superQuickVoiceCheck)(
            interaction
          );
          let realCheck = yield (0, superQuick_1.superQuickTrueOrFalseCheck)(
            check,
            check2
          );
          if (realCheck == true) {
            player === null || player === void 0
              ? void 0
              : player.seek(
                  Number(
                    player === null || player === void 0
                      ? void 0
                      : player.position
                  ) - 10000
                );
            clearInterval(ier);
            (_8 = yield (_7 = interaction.channel) === null || _7 === void 0
              ? void 0
              : _7.messages.fetch(interaction.message.id)) === null ||
            _8 === void 0
              ? void 0
              : msgEditor(player, client, _8).catch(() => {});
          }
        }
        break;
      case "casper_seek_go":
        {
          if (
            interaction.member?.voice?.channelId !==
            interaction.guild?.me.voice?.channelId
          )
            return;
          let check = yield (0, superQuick_1.superQuickPlayingCheck)(
            client,
            interaction
          );
          let check2 = yield (0, superQuick_1.superQuickVoiceCheck)(
            interaction
          );
          let realCheck = yield (0, superQuick_1.superQuickTrueOrFalseCheck)(
            check,
            check2
          );
          if (realCheck == true) {
            player === null || player === void 0
              ? void 0
              : player.seek(
                  Number(
                    player === null || player === void 0
                      ? void 0
                      : player.position
                  ) + 10000
                );
            clearInterval(ier);
            (_14 = yield (_13 = interaction.channel) === null || _13 === void 0
              ? void 0
              : _13.messages.fetch(interaction.message.id)) === null ||
            _14 === void 0
              ? void 0
              : msgEditor(player, client, _14).catch(() => {});
          }
        }
        break;
      case "casper_skip":
        {
          if (
            interaction.member?.voice?.channelId !==
            interaction.guild?.me.voice?.channelId
          )
            return;
          let check = yield (0, superQuick_1.superQuickPlayingCheck)(
            client,
            interaction
          );
          let check2 = yield (0, superQuick_1.superQuickVoiceCheck)(
            interaction
          );
          let realCheck = yield (0, superQuick_1.superQuickTrueOrFalseCheck)(
            check,
            check2
          );
          if (realCheck == true) {
            if (
              (_15 =
                player === null || player === void 0
                  ? void 0
                  : player.queue.current) === null || _15 === void 0
                ? void 0
                : _15.isSeekable
            )
              player.stop();
            quick_db_1.default.set(`LastTrack_${interaction.guildId}`, null);
            clearInterval(ier);
            (_21 = yield (_20 = interaction.channel) === null || _20 === void 0
              ? void 0
              : _20.messages.fetch(interaction.message.id)) === null ||
            _21 === void 0
              ? void 0
              : msgEditor(player, client, _21, null, player.queue[0]).catch(
                  () => {}
                );
          }
        }
        break;
      case "casper_back":
        {
          if (
            interaction.member?.voice?.channelId !==
            interaction.guild?.me.voice?.channelId
          )
            return;
          let check = yield (0, superQuick_1.superQuickPlayingCheck)(
            client,
            interaction
          );
          let check2 = yield (0, superQuick_1.superQuickVoiceCheck)(
            interaction
          );
          let realCheck = yield (0, superQuick_1.superQuickTrueOrFalseCheck)(
            check,
            check2
          );
          if (realCheck == true) {
            if (
              player === null || player === void 0
                ? void 0
                : player.queue.previous
            )
              player.queue.add(
                player === null || player === void 0
                  ? void 0
                  : player.queue.previous
              );
            clearInterval(ier);
            (_27 = yield (_26 = interaction.channel) === null || _26 === void 0
              ? void 0
              : _26.messages.fetch(interaction.message.id)) === null ||
            _27 === void 0
              ? void 0
              : msgEditor(player, client, _27).catch(() => {});
          }
        }
        break;
      default:
        break;
    }
  });
}
exports.setupCommandButtons = setupCommandButtons;
