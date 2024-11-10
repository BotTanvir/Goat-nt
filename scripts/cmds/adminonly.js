const fs = require("fs-extra");
const { config } = global.GoatBot;
const { client } = global;

module.exports = {
	config: {
		name: "adminonly",
		aliases: ["adonly", "onlyad", "onlyadmin"],
		version: "1.5",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "bật/tắt chế độ chỉ admin mới có thể sử dụng bot",
			en: "turn on/off only admin can use bot"
		},
		category: "owner",
		guide: {
			vi: "   {pn} [on | off]: bật/tắt chế độ chỉ admin mới có thể sử dụng bot"
				+ "\n   {pn} noti [on | off]: bật/tắt thông báo khi người dùng không phải là admin sử dụng bot",
			en: "   {pn} [on | off]: turn on/off the mode only admin can use bot"
				+ "\n   {pn} noti [on | off]: turn on/off the notification when user is not admin use bot"
		}
	},

	langs: {
		vi: {
			turnedOn: "Đã bật chế độ chỉ admin mới có thể sử dụng bot",
			turnedOff: "Đã tắt chế độ chỉ admin mới có thể sử dụng bot",
			turnedOnNoti: "Đã bật thông báo khi người dùng không phải là admin sử dụng bot",
			turnedOffNoti: "Đã tắt thông báo khi người dùng không phải là admin sử dụng bot"
		},
		en: {
			turnedOn: "●❯────────────────❮●\n        -♦𝐓𝐀𝐍𝐕𝐈𝐑-𝐁𝐎𝐓♦-       \n●❯────────────────❮●\n\n💥__𝐓𝐮𝐫𝐧𝐞𝐝 𝐨𝐧 𝐭𝐡𝐞 𝐦𝐨𝐝𝐞 𝐨𝐧𝐥𝐲 𝐚𝐝𝐦𝐢𝐧 𝐜𝐚𝐧 𝐮𝐬𝐞 𝐛𝐨𝐭__🤙🏻\n\n●❯────────────────❮●",
			turnedOff: "●❯────────────────❮●\n        -♦𝐓𝐀𝐍𝐕𝐈𝐑-𝐁𝐎𝐓♦-       \n●❯────────────────❮●\n\n😎__𝐓𝐮𝐫𝐧𝐞𝐝 𝐨𝐟𝐟 𝐭𝐡𝐞 𝐦𝐨𝐝𝐞 𝐨𝐧𝐥𝐲 𝐚𝐝𝐦𝐢𝐧 𝐜𝐚𝐧 𝐮𝐬𝐞 𝐛𝐨𝐭__🥵\n\n●❯────────────────❮●",
			turnedOnNoti: "●❯────────────────❮●\n        -♦𝐓𝐀𝐍𝐕𝐈𝐑-𝐁𝐎𝐓♦-       \n●❯────────────────❮●\n\n⚠️__𝐓𝐮𝐫𝐧𝐞𝐝 𝐨𝐧 𝐭𝐡𝐞 𝐧𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐰𝐡𝐞𝐧 𝐮𝐬𝐞𝐫 𝐢𝐬 𝐧𝐨𝐭 𝐚𝐝𝐦𝐢𝐧 𝐮𝐬𝐞 𝐛𝐨𝐭__🚨\n\n●❯────────────────❮●",
			turnedOffNoti: "●❯────────────────❮●\n        -♦𝐓𝐀𝐍𝐕𝐈𝐑-𝐁𝐎𝐓♦-       \n●❯────────────────❮●\n\n♦️__𝐓𝐮𝐫𝐧𝐞𝐝 𝐨𝐟𝐟 𝐭𝐡𝐞 𝐧𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐰𝐡𝐞𝐧 𝐮𝐬𝐞𝐫 𝐢𝐬 𝐧𝐨𝐭 𝐚𝐝𝐦𝐢𝐧 𝐮𝐬𝐞 𝐛𝐨𝐭__🔰\n\n●❯────────────────❮●"
		}
	},

	onStart: function ({ args, message, getLang }) {
		let isSetNoti = false;
		let value;
		let indexGetVal = 0;

		if (args[0] == "noti") {
			isSetNoti = true;
			indexGetVal = 1;
		}

		if (args[indexGetVal] == "on")
			value = true;
		else if (args[indexGetVal] == "off")
			value = false;
		else
			return message.SyntaxError();

		if (isSetNoti) {
			config.hideNotiMessage.adminOnly = !value;
			message.reply(getLang(value ? "turnedOnNoti" : "turnedOffNoti"));
		}
		else {
			config.adminOnly.enable = value;
			message.reply(getLang(value ? "turnedOn" : "turnedOff"));
		}

		fs.writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
	}
};
