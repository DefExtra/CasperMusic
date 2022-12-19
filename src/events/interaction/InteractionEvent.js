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
const temp_1 = __importDefault(require("../../utils/temp"));
const superQuick_1 = require("../../functions/superQuick");
const setupCommandButtons_1 = require("../../functions/setupCommandButtons");
const replys_json_1 = __importDefault(require("../../../replys.json"));
const quick_db_1 = __importDefault(require("quick.db"));
const checkVoice_1 = __importDefault(require("../../functions/checkVoice"));
const checkPlayer_1 = __importDefault(require("../../functions/checkPlayer"));
class _callStrobk {
  constructor(error) {
    return error;
  }
}
class InteractionCreateEvent extends BaseEvent_1.default {
  constructor() {
    super("interactionCreate");
  }
  run(client, interaction) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
      yield (0, setupCommandButtons_1.setupCommandButtons)(interaction, client);
      let lang =
        (yield Promise.resolve().then(() =>
          __importStar(require("quick.db"))
        )).fetch(`Lang_${interaction.guildId}`) || "en";
      let replys = replys_json_1.default[lang];
      if (interaction.isContextMenu()) {
        yield interaction.deferReply({ ephemeral: true }).catch(() => { });
        const message = yield (_a = interaction.channel) === null ||
          _a === void 0
          ? void 0
          : _a.messages.fetch(interaction.targetId);
        (0, checkVoice_1.default)(interaction, interaction.user).then((res) =>
          __awaiter(this, void 0, void 0, function* () {
            var _d;
            if (res == "notInTheSameVoiceChannel") {
              interaction
                .followUp({
                  content: replys.notInTheSameVoiceChannel,
                })
                .catch(() => { });
              return;
            } else if (res == "notInVoiceChannel") {
              interaction
                .followUp({
                  content: replys.notInVoiceChannel,
                })
                .catch(() => { });
              return;
            }
            if (
              !(message === null || message === void 0
                ? void 0
                : message.content)
            )
              return;
            const respond = yield (_d = client.manager) === null ||
              _d === void 0
              ? void 0
              : _d.search(message.content, interaction.user);
            yield temp_1.default.set(message.author.id, null);
            yield (0, checkPlayer_1.default)({
              author: interaction.user,
              base: interaction,
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
                  })().then(() =>
                    __awaiter(this, void 0, void 0, function* () {
                      yield interaction.followUp({
                        content: `**${require("../../../config.json").emojis.plus} | \`${message.content}\` has added to queue.**`,
                      });
                    })
                  );
                }
              })
            );
          })
        );
      } else if (interaction.isCommand()) {
        yield interaction.deferReply({ ephemeral: true }).catch(() => { });
        interaction
          .followUp({
            content: replys.tryingPlayMusic,
            ephemeral: true,
          })
          .then((m) =>
            __awaiter(this, void 0, void 0, function* () {
              setTimeout(
                () =>
                  __awaiter(this, void 0, void 0, function* () {
                    var _e;
                    if (
                      ((_e = interaction.channel) === null || _e === void 0
                        ? void 0
                        : _e.type) == "DM"
                    )
                      return interaction.editReply({
                        content: replys.cantUseInDM,
                      });
                    let wsC = quick_db_1.default.fetch(
                      `WS_${interaction.guildId}`
                    );
                    if (wsC !== null && interaction.channelId !== wsC)
                      return interaction.editReply({
                        content: replys.onlyIn.replace("{channel}", `<#${wsC}>`),
                      });
                    const cmdName = interaction.commandName;
                    const command = client.commands.get(cmdName);
                    if (command) {
                      temp_1.default.set(interaction.user.id, interaction);
                      command.run(
                        client,
                        interaction,
                        null,
                        [],
                        interaction.user
                      );
                    } else {
                      if (cmdName !== "") interaction.editReply({
                        content: replys.noCommandFound,
                      });
                      else interaction.deleteReply().catch(() => {});
                    }
                  }),
                471
              );
            })
          );
      } else if (interaction.isButton()) {
        if (interaction.customId.startsWith("casper_"))
          {}
        else {
          let manager = client.manager;
          yield interaction.deferUpdate().catch(() => { });
          let player =
            manager === null || manager === void 0
              ? void 0
              : manager.players.get(interaction.guildId || "");
          switch (interaction.customId) {
            case "play_pause":
              {
                let check = yield (0, superQuick_1.superQuickPlayingCheck)(
                  client,
                  interaction
                );
                let check2 = yield (0, superQuick_1.superQuickVoiceCheck)(
                  interaction
                );
                let realCheck = yield (0,
                  superQuick_1.superQuickTrueOrFalseCheck)(check, check2);
                if (realCheck == true) {
                  if (
                    player === null || player === void 0
                      ? void 0
                      : player.paused
                  )
                    player === null || player === void 0
                      ? void 0
                      : player.pause(false);
                  else
                    player === null || player === void 0
                      ? void 0
                      : player.pause(true);
                }
              }
              break;
            case "stop":
              {
                let check = yield (0, superQuick_1.superQuickPlayingCheck)(
                  client,
                  interaction
                );
                let check2 = yield (0, superQuick_1.superQuickVoiceCheck)(
                  interaction
                );
                let realCheck = yield (0,
                  superQuick_1.superQuickTrueOrFalseCheck)(check, check2);
                if (realCheck == true) {
                  player === null || player === void 0
                    ? void 0
                    : player.destroy();
                  quick_db_1.default.set(
                    `LastTrack_${interaction.guildId}`,
                    null
                  );
                  (_c = yield (_b = interaction.channel) === null ||
                    _b === void 0
                    ? void 0
                    : _b.messages.fetch(interaction.message.id)) === null ||
                    _c === void 0
                    ? void 0
                    : _c.delete().catch(() => { });
                }
              }
              break;
            case "volume_up":
              {
                let check = yield (0, superQuick_1.superQuickPlayingCheck)(
                  client,
                  interaction
                );
                let check2 = yield (0, superQuick_1.superQuickVoiceCheck)(
                  interaction
                );
                let realCheck = yield (0,
                  superQuick_1.superQuickTrueOrFalseCheck)(check, check2);
                if (realCheck == true) {
                  let vol =
                    player === null || player === void 0
                      ? void 0
                      : player.volume;
                  player === null || player === void 0
                    ? void 0
                    : player.setVolume(vol + 10);
                }
              }
              break;
            case "volume_down":
              {
                let check = yield (0, superQuick_1.superQuickPlayingCheck)(
                  client,
                  interaction
                );
                let check2 = yield (0, superQuick_1.superQuickVoiceCheck)(
                  interaction
                );
                let realCheck = yield (0,
                  superQuick_1.superQuickTrueOrFalseCheck)(check, check2);
                if (realCheck == true) {
                  let vol =
                    player === null || player === void 0
                      ? void 0
                      : player.volume;
                  player === null || player === void 0
                    ? void 0
                    : player.setVolume(vol - 10);
                }
              }
              break;
            case "loop":
              {
                let check = yield (0, superQuick_1.superQuickPlayingCheck)(
                  client,
                  interaction
                );
                let check2 = yield (0, superQuick_1.superQuickVoiceCheck)(
                  interaction
                );
                let realCheck = yield (0,
                  superQuick_1.superQuickTrueOrFalseCheck)(check, check2);
                if (realCheck == true) {
                  if (
                    player === null || player === void 0
                      ? void 0
                      : player.trackRepeat
                  )
                    player === null || player === void 0
                      ? void 0
                      : player.setTrackRepeat(false);
                  else
                    player === null || player === void 0
                      ? void 0
                      : player.setTrackRepeat(true);
                }
              }
              break;
            default:
              break;
          }
        }
      }
    });
  }
}
exports.default = InteractionCreateEvent;
