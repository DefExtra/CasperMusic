"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
const discord_js_1 = require("discord.js");
const checkVoice_1 = __importDefault(require("../../functions/checkVoice"));
const BaseCommand_1 = __importDefault(
  require("../../utils/structures/BaseCommand")
);
const replys_json_1 = __importDefault(require("../../../replys.json"));
const ms_1 = __importDefault(require("ms"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const commandName = "nowplaying";
class StopCommand extends BaseCommand_1.default {
  constructor() {
    super(commandName, "music", ["np"], {
      name: commandName,
      description: "Displays info about the currently playing track",
      type: "CHAT_INPUT",
      options: [],
    });
  }
  run(client, interaction, message, args, author) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function* () {
      let base = message ? message : interaction;
      let lang =
        (yield Promise.resolve().then(() =>
          __importStar(require("quick.db"))
        )).fetch(`Lang_${base.guildId}`) || "en";
      let replys = replys_json_1.default[lang];
      try {
        if (
          ((_c =
            (_a = client.manager) === null || _a === void 0
              ? void 0
              : _a.players.get(
                  ((_b = base.guild) === null || _b === void 0
                    ? void 0
                    : _b.id) || ""
                )) === null || _c === void 0
            ? void 0
            : _c.queue.current) &&
          (yield (0, checkVoice_1.default)(base, author)) !==
            "notInTheSameVoiceChannel" &&
          (yield (0, checkVoice_1.default)(base, author)) !==
            "notInVoiceChannel"
        ) {
          function bar(position, duration) {
            return __awaiter(this, void 0, void 0, function* () {
              let deg = position / duration;
              let done = Math.round(25 * deg);
              let notDone = 25 - done;
              let progressText = "▇".repeat(done);
              let emptyProgressText = "—".repeat(notDone);
              let Bar = progressText + emptyProgressText;
              return Bar;
            });
          }
          function deg(position, duration) {
            return __awaiter(this, void 0, void 0, function* () {
              let deg = position / duration;
              let runningDeg = Math.round(deg * 100) + "%";
              return runningDeg;
            });
          }
          let player =
            (_d = client.manager) === null || _d === void 0
              ? void 0
              : _d.players.get(base.guildId || "");
          let song =
            player === null || player === void 0
              ? void 0
              : player.queue.current;
          let requester =
            song === null || song === void 0 ? void 0 : song.requester;
          var _b, _c, _d, _e, _f, _g;
          let thumbnail =
            (yield require("node-fetch").default(
              player?.queue?.current?.displayThumbnail("maxresdefault")
            )).statusText == "OK"
              ? player?.queue?.current?.displayThumbnail("maxresdefault")
              : require("../../../config.json").images.quickPlay;
          setTimeout(() =>
            __awaiter(this, void 0, void 0, function* () {
              var _j, _k, _l;
              let requesterAvatar =
                (_j = client.users.cache.get(
                  (
                    requester === null || requester === void 0
                      ? void 0
                      : requester.id
                  )
                    ? requester === null || requester === void 0
                      ? void 0
                      : requester.id
                    : "" || ""
                )) === null || _j === void 0
                  ? void 0
                  : _j.avatarURL({ dynamic: true });
              let requesterUsername =
                (_k = client.users.cache.get(
                  (
                    requester === null || requester === void 0
                      ? void 0
                      : requester.id
                  )
                    ? requester === null || requester === void 0
                      ? void 0
                      : requester.id
                    : "" || ""
                )) === null || _k === void 0
                  ? void 0
                  : _k.username;
              let Embed = new discord_js_1.MessageEmbed()
                .setColor("#4458F7")
                .setAuthor({
                  name:
                    (song === null || song === void 0 ? void 0 : song.title) ||
                    "",
                  iconURL:
                    ((_l = client.user) === null || _l === void 0
                      ? void 0
                      : _l.avatarURL({ dynamic: true })) || "",
                  url: song === null || song === void 0 ? void 0 : song.uri,
                })
                .setFooter({
                  iconURL: requesterAvatar || "",
                  text: requesterUsername || "",
                })
                .setDescription(
                  "Duration: " +
                    (yield bar(
                      (player === null || player === void 0
                        ? void 0
                        : player.position) || 0,
                      (song === null || song === void 0
                        ? void 0
                        : song.duration) || 0
                    )) +
                    " " +
                    (yield deg(
                      (player === null || player === void 0
                        ? void 0
                        : player.position) || 0,
                      (song === null || song === void 0
                        ? void 0
                        : song.duration) || 0
                    ))
                )
                .setThumbnail(thumbnail)
                .setTimestamp(new Date())
                .addField(
                  "Author: ",
                  (song === null || song === void 0 ? void 0 : song.author) ||
                    "",
                  true
                )
                .addField(
                  "Duration: ",
                  (0, ms_1.default)(
                    (song === null || song === void 0
                      ? void 0
                      : song.duration) || 0
                  ),
                  true
                );
              if (message == null)
                interaction
                  .editReply({
                    content: "Currently playing...",
                    embeds: [Embed],
                  })
                  .catch(() => {});
              else
                message
                  .edit({
                    content: "Currently playing...",
                    embeds: [Embed],
                  })
                  .catch(() => {});
            })
          );
        } else {
          if (
            !((_g =
              (_e = client.manager) === null || _e === void 0
                ? void 0
                : _e.players.get(
                    ((_f = base.guild) === null || _f === void 0
                      ? void 0
                      : _f.id) || ""
                  )) === null || _g === void 0
              ? void 0
              : _g.queue.current)
          ) {
            if (message == null)
              interaction
                .editReply({
                  content: replys.noPlayingMusic,
                })
                .catch(() => {});
            else
              message
                .edit({
                  content: replys.noPlayingMusic,
                })
                .catch(() => {});
            return;
          } else if (
            (yield (0, checkVoice_1.default)(base, author)) ==
            "notInVoiceChannel"
          ) {
            if (message == null)
              interaction
                .editReply({
                  content: replys.notInVoiceChannel,
                })
                .catch(() => {});
            else
              message
                .edit({
                  content: replys.notInVoiceChannel,
                })
                .catch(() => {});
            return;
          } else if (
            (yield (0, checkVoice_1.default)(base, author)) ==
            "notInTheSameVoiceChannel"
          ) {
            if (message == null)
              interaction
                .editReply({
                  content: replys.notInTheSameVoiceChannel,
                })
                .catch(() => {});
            else
              message
                .edit({
                  content: replys.notInTheSameVoiceChannel,
                })
                .catch(() => {});
            return;
          }
        }
      } catch (_h) {
        console.log(_h)
        if (message == null)
          interaction
            .editReply({
              content: replys.npHE,
            })
            .catch(() => {});
        else
          message
            .edit({
              content: replys.npHE,
            })
            .catch(() => {});
        return;
      }
    });
  }
}
exports.default = StopCommand;