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
const node_fetch_1 = __importDefault(require("node-fetch"));
const ms_1 = __importDefault(require("ms"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const commandName = "grab";
class StopCommand extends BaseCommand_1.default {
  constructor() {
    super(commandName, "music", [], {
      name: commandName,
      description: "get the current playing song and send it to your DM.",
      type: "CHAT_INPUT",
      options: [],
    });
  }
  run(client, interaction, message, args, author) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function* () {
      let base = message ? message : interaction;
      let lang =
        (yield Promise.resolve().then(() =>
          __importStar(require("quick.db"))
        )).fetch(`Lang_${base.guildId}`) || "en";
      let replys = replys_json_1.default[lang];
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
        (yield (0, checkVoice_1.default)(base, author)) !== "notInVoiceChannel"
      ) {
        let player =
          (_d = client.manager) === null || _d === void 0
            ? void 0
            : _d.players.get(base.guildId || "");
        let trackF =
          player === null || player === void 0 ? void 0 : player.queue.current;
        let ytdlDetails = yield ytdl_core_1.default.getInfo(
          ((_e =
            player === null || player === void 0
              ? void 0
              : player.queue.current) === null || _e === void 0
            ? void 0
            : _e.uri) || ""
        );
        let thumbnail =
          (yield require("node-fetch").default(
            track?.displayThumbnail("maxresdefault")
          )).statusText == "OK"
            ? track?.displayThumbnail("maxresdefault")
            : require("../../../config.json").images.quickPlay;
        let d =
          ((_a =
            player === null || player === void 0
              ? void 0
              : player.queue.current) === null || _a === void 0
            ? void 0
            : _a.duration) || 10000;
        let req =
          (_b =
            player === null || player === void 0
              ? void 0
              : player.queue.current) === null || _b === void 0
            ? void 0
            : _b.requester;
        let Embed = new discord_js_1.MessageEmbed()
          .setColor("#4458F7")
          .setThumbnail(thumbnail)
          .setAuthor({
            name:
              ((_c =
                player === null || player === void 0
                  ? void 0
                  : player.queue.current) === null || _c === void 0
                ? void 0
                : _c.title) || "",
            iconURL: thumbnail || "",
            url:
              ((_d =
                player === null || player === void 0
                  ? void 0
                  : player.queue.current) === null || _d === void 0
                ? void 0
                : _d.uri) || "",
          })
          .setTitle("Download Link")
          .setURL(
            ((_e =
              player === null || player === void 0
                ? void 0
                : player.queue.current) === null || _e === void 0
              ? void 0
              : _e.uri) || ""
          )
          .addField(
            "Title: ",
            ((_f =
              player === null || player === void 0
                ? void 0
                : player.queue.current) === null || _f === void 0
              ? void 0
              : _f.title) || "",
            true
          )
          .addField(
            "Author: ",
            ((_g =
              player === null || player === void 0
                ? void 0
                : player.queue.current) === null || _g === void 0
              ? void 0
              : _g.author) || "",
            true
          )
          .addField("Duration: ", (0, ms_1.default)(d), true)
          .addField(
            "Requester: ",
            String(
              (_h = client.users.cache.get(req.id)) === null || _h === void 0
                ? void 0
                : _h.username
            ),
            true
          )
          .addField("Track: ", ytdlDetails.videoDetails.published + "", true)
          .addField(
            "Url: ",
            ((_j =
              player === null || player === void 0
                ? void 0
                : player.queue.current) === null || _j === void 0
              ? void 0
              : _j.uri) || "",
            true
          )
          .addField(
            "Likes: ",
            String(ytdlDetails.videoDetails.likes) + " 👍",
            true
          )
          .addField(
            "Dislikes: ",
            String(ytdlDetails.videoDetails.dislikes) + " 👎",
            true
          )
          .addField(
            "viewCount: ",
            ytdlDetails.videoDetails.viewCount || "",
            true
          );
        author
          .send({
            embeds: [Embed],
          })
          .then(() => {
            if (message == null)
              interaction.editReply({
                content: "Check your DM.",
              });
            else
              message.edit({
                content: "Check your DM.",
              });
          })
          .catch(() => {
            if (message == null)
              interaction.editReply({
                content: "Please open you DM to resive the bot data.",
                embeds: [Embed],
              });
            else
              message.edit({
                content: "Please open you DM to resive the bot data.",
              });
          });
      } else {
        if (
          !((_h =
            (_f = client.manager) === null || _f === void 0
              ? void 0
              : _f.players.get(
                  ((_g = base.guild) === null || _g === void 0
                    ? void 0
                    : _g.id) || ""
                )) === null || _h === void 0
            ? void 0
            : _h.queue.current)
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
          (yield (0, checkVoice_1.default)(base, author)) == "notInVoiceChannel"
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
    });
  }
}
exports.default = StopCommand;
