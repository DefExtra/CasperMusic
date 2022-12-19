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
const BaseMusicEvent_1 = __importDefault(
  require("../../utils/structures/BaseMusicEvent")
);
const quick_db_1 = __importDefault(require("quick.db"));
const discord_js_1 = require("discord.js");
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
class QueueEndEvent extends BaseMusicEvent_1.default {
  constructor() {
    super("trackAdded");
  }
  run(client, player, current) {
    return __awaiter(this, void 0, void 0, function* () {
      if (current == false) {
        let data = quick_db_1.default.fetch(`Channel_${player.guild}`);
        if (data == null) return;
        let guild = client.guilds.cache.get(player.guild);
        let channelR =
          guild === null || guild === void 0
            ? void 0
            : guild.channels.cache.get(data.channel.id);
        channelR.messages
          .fetch(data === null || data === void 0 ? void 0 : data.messsageId)
          .then((msg) =>
            __awaiter(this, void 0, void 0, function* () {
              var _b;
              let track = player.queue.current;
              let thumbnail =
                (yield require("node-fetch").default(
                  track?.displayThumbnail("maxresdefault")
                )).statusText == "OK"
                  ? track?.displayThumbnail("maxresdefault")
                  : require("../../../config.json").images.quickPlay;
              let Embed = new discord_js_1.MessageEmbed()
                .setColor("#4458F7")
                .setTitle(
                  track === null || track === void 0 ? void 0 : track.title
                )
                .setImage(thumbnail)
                .setFooter({
                  text: "0 songs in queue | volume: 70% | loop: false | paused: false",
                  iconURL: client.user?.avatarURL({ dynamic: true }) || "",
                })
                .setDescription(
                  "Duration: " +
                    (yield bar(
                      (player === null || player === void 0
                        ? void 0
                        : player.position) || 0,
                      ((_a =
                        player === null || player === void 0
                          ? void 0
                          : player.queue.current) === null || _a === void 0
                        ? void 0
                        : _a.duration) || 0
                    )) +
                    " " +
                    (yield deg(
                      (player === null || player === void 0
                        ? void 0
                        : player.position) || 0,
                      ((_b =
                        player === null || player === void 0
                          ? void 0
                          : player.queue.current) === null || _b === void 0
                        ? void 0
                        : _b.duration) || 0
                    ))
                );
              msg
                .edit({
                  content: `**__Queue list__**:\n.${player.queue.map(
                    (v, i) => `${i}. ${v.title}`
                  )}`,
                  embeds: [Embed],
                })
                .catch(() => {});
            })
          )
          .catch(() => {});
      }
    });
  }
}
exports.default = QueueEndEvent;
