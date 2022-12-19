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
const BaseEvent_1 = __importDefault(
  require("../../utils/structures/BaseEvent")
);

const discord_js_1 = require("discord.js");
const temp_1 = __importDefault(require("../../utils/temp"));
const quick_db_1 = __importDefault(require("quick.db"));
const checkVoice_1 = __importDefault(require("../../functions/checkVoice"));
const checkPlayer_1 = __importDefault(require("../../functions/checkPlayer"));
const replys_json_1 = __importDefault(require("../../../replys.json"));
const config_json_1 = __importDefault(require("../../../config.json"));
const node_fetch_1 = __importDefault(require("node-fetch"));
function bar(position, duration) {
  return __awaiter(this, void 0, void 0, function* () {
    let deg = position / duration;
    let done = Math.round(20 * deg);
    let notDone = 20 - done;
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
      : require("../../../config.json").images.quickPlay;
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
      msgEditor(client.manager.players.get(_g.guildId), client, _g, content, tracker);
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

class MessageEvent extends BaseEvent_1.default {
  constructor() {
    super("messageCreate");
  }
  run(client, message) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
      let lang =
        (yield Promise.resolve().then(() =>
          __importStar(require("quick.db"))
        )).fetch(`Lang_${message.guildId}`) || "en";
      let replys = replys_json_1.default[lang];
      try {
        if (message.author.bot) return;
        if (
          !((_a = message.guild) === null || _a === void 0 ? void 0 : _a.id) ||
          ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.id) ==
            null ||
          message.guild.id == undefined
        )
          return;
        let data = quick_db_1.default.fetch(
          `Channel_${
            message === null || message === void 0 ? void 0 : message.guildId
          }`
        );
        let prefix =
          quick_db_1.default.fetch(
            `Prefix_${
              (_c = message.guild) === null || _c === void 0 ? void 0 : _c.id
            }`
          ) || config_json_1.default.prefix;
        if (
          message.mentions.members &&
          ((_d = message.mentions.members.first()) === null || _d === void 0
            ? void 0
            : _d.id) ==
            ((_e = client.user) === null || _e === void 0 ? void 0 : _e.id)
        )
          message === null || message === void 0
            ? void 0
            : message.reply({
                content: `${
                  require("../../../config.json").emojis.casperEmoji
                } Casper is here.\nmy prefix in **${
                  message.guild.name
                }** is \`${prefix}\`\nmy default language in **${
                  message.guild.name
                }** is\`${lang}\``,
              });
        if (message.content.startsWith(prefix)) {
          message === null || message === void 0
            ? void 0
            : message
                .reply({
                  content: replys.tryingPlayMusic,
                })
                .then((m) =>
                  __awaiter(this, void 0, void 0, function* () {
                    setTimeout(
                      () =>
                        __awaiter(this, void 0, void 0, function* () {
                          const [cmdName, ...cmdArgs] = message.content
                            .slice(prefix.length)
                            .trim()
                            .split(/\s+/);
                          let wsC = quick_db_1.default.fetch(
                            `WS_${message.guildId}`
                          );
                          if (wsC !== null && message.channelId !== wsC)
                            return m
                              .edit({
                                content: replys.onlyIn.replace(
                                  "{channel}",
                                  `<#${wsC}>`
                                ),
                              })
                              .catch(() => {});
                          const command = client.commands.get(cmdName);
                          if (command) {
                            temp_1.default.set(message.author.id, message);
                            command.run(
                              client,
                              null,
                              m,
                              cmdArgs,
                              message.author
                            );
                          } else {
                            if (cmdName !== "")
                              m.edit({
                                content: replys.noCommandFound,
                              });
                            else m.delete().catch(() => {});
                          }
                        }),
                      471
                    );
                  })
                )
                .catch(() => {});
        } else if (
          data !== null &&
          (data === null || data === void 0 ? void 0 : data.channel.id) ==
            ((_f = message.channel) === null || _f === void 0 ? void 0 : _f.id)
        ) {
          yield message.delete().catch(() => {});
          yield message.channel.messages
            .fetch(data === null || data === void 0 ? void 0 : data.messsageId)
            .then((msg) => {
              (0, checkVoice_1.default)(message, message.author).then((out) =>
                __awaiter(this, void 0, void 0, function* () {
                  var _a, _b, _c, _d, _e, _f;
                  if (out == "notInVoiceChannel") return;
                  if (
                    (_b =
                      (_a = message.guild) === null || _a === void 0
                        ? void 0
                        : _a.me) === null || _b === void 0
                      ? void 0
                      : _b.voice.channel
                  ) {
                    if (
                      ((_d =
                        (_c = message.guild) === null || _c === void 0
                          ? void 0
                          : _c.me) === null || _d === void 0
                        ? void 0
                        : _d.voice.channelId) !==
                      ((_e = message.member) === null || _e === void 0
                        ? void 0
                        : _e.voice.channelId)
                    )
                      return;
                  }
                  if (!message.content) return;
                  const respond = yield (_f = client.manager) === null ||
                  _f === void 0
                    ? void 0
                    : _f.search(message.content, message.author);
                  yield temp_1.default.set(message.author.id, null);
                  yield (0, checkPlayer_1.default)({
                    author: message.author,
                    base: message,
                    client,
                    resultRespond: respond,
                  }).then((player) =>
                    __awaiter(this, void 0, void 0, function* () {
                      if (
                        (respond === null || respond === void 0
                          ? void 0
                          : respond.loadType) !== "LOAD_FAILED" &&
                        (respond === null || respond === void 0
                          ? void 0
                          : respond.loadType) !== "NO_MATCHES"
                      ) {
                        (function () {
                          return __awaiter(this, void 0, void 0, function* () {
                            if (
                              (respond === null || respond === void 0
                                ? void 0
                                : respond.loadType) == "PLAYLIST_LOADED"
                            )
                              yield player === null || player === void 0
                                ? void 0
                                : player.queue.add(
                                    respond === null || respond === void 0
                                      ? void 0
                                      : respond.tracks
                                  );
                            else if (
                              (respond === null || respond === void 0
                                ? void 0
                                : respond.loadType) == "SEARCH_RESULT" ||
                              (respond === null || respond === void 0
                                ? void 0
                                : respond.loadType) == "TRACK_LOADED"
                            )
                              yield player === null || player === void 0
                                ? void 0
                                : player.queue.add(respond.tracks[0]);
                            if (
                              !(player === null || player === void 0
                                ? void 0
                                : player.playing) &&
                              !(player === null || player === void 0
                                ? void 0
                                : player.paused) &&
                              !(player === null || player === void 0
                                ? void 0
                                : player.queue.size)
                            )
                              player === null || player === void 0
                                ? void 0
                                : player.play();
                            if (
                              !(player === null || player === void 0
                                ? void 0
                                : player.playing) &&
                              !(player === null || player === void 0
                                ? void 0
                                : player.paused) &&
                              (player === null || player === void 0
                                ? void 0
                                : player.queue.totalSize) ===
                                (respond === null || respond === void 0
                                  ? void 0
                                  : respond.tracks.length)
                            )
                              yield player === null || player === void 0
                                ? void 0
                                : player.play();
                          });
                        })().then(async () => {
                          let track =
                            player === null || player === void 0
                              ? void 0
                              : player.queue.current;
                          let thumbnail =
                            (
                              await require("node-fetch").default(
                                track?.displayThumbnail("maxresdefault")
                              )
                            ).statusText == "OK"
                              ? track?.displayThumbnail("maxresdefault")
                              : require("../../../config.json").images
                                  .quickPlay;

                          let Embed = new discord_js_1.MessageEmbed()
                            .setColor("#4458F7")
                            .setTitle(
                              track === null || track === void 0
                                ? void 0
                                : track.title
                            )
                            .setImage(
                              thumbnail ||
                                require("../../../config.json").images.quickPlay
                            )
                            .setFooter({
                              text: `${
                                player === null || player === void 0
                                  ? void 0
                                  : player.queue.size
                              } songs in queue | volume: ${
                                player === null || player === void 0
                                  ? void 0
                                  : player.volume
                              }% | loop: ${
                                player === null || player === void 0
                                  ? void 0
                                  : player.trackRepeat
                              } | paused: ${
                                player === null || player === void 0
                                  ? void 0
                                  : player.paused
                              }`,
                              iconURL:
                                ((_a = client.user) === null || _a === void 0
                                  ? void 0
                                  : _a.avatarURL({ dynamic: true })) || "",
                            })
                            .setDescription(
                              "Duration: " +
                                (await bar(
                                  (player === null || player === void 0
                                    ? void 0
                                    : player.position) || 0,
                                  ((_b =
                                    player === null || player === void 0
                                      ? void 0
                                      : player.queue.current) === null ||
                                  _b === void 0
                                    ? void 0
                                    : _b.duration) || 0
                                )) +
                                " " +
                                (await deg(
                                  (player === null || player === void 0
                                    ? void 0
                                    : player.position) || 0,
                                  ((_c =
                                    player === null || player === void 0
                                      ? void 0
                                      : player.queue.current) === null ||
                                  _c === void 0
                                    ? void 0
                                    : _c.duration) || 0
                                ))
                            );
                          clearInterval(ier);
                          msgEditor(player, client, msg).catch(() => {});
                        });
                      }
                    })
                  );
                })
              );
            })
            .catch(() => {});
        }
      } catch (_err) {
        console.log(_err);
      }
    });
  }
}
exports.default = MessageEvent;
