---
title: Thông tin hữu ích
description: Các thông tin hữu ích khi bạn sử dụng Discord
---

## Thời gian Discord
Thời gian Discord có thể rất hữu ích để xác định ngày/giờ theo múi giờ của nhiều người dùng khác nhau. Chúng hoạt động dựa trên định dạng Unix Timestamp và có thể được đăng bởi người dùng thông thường cũng như bot và ứng dụng.

[The Epoch Unix Time Stamp Converter](https://www.unixtimestamp.com/) là cách tốt để nhanh chóng tạo ra một timestamp. Đối với các ví dụ dưới đây, mình sẽ sử dụng Time Stamp là 1543392060, tương đương với ngày 28 tháng 11 năm 2018 lúc 15:01:00 giờ theo múi giờ của Việt Nam (GMT+0700).

|Kiểu|Đầu vào|Đầu ra (đồng hồ 12 giờ)|Đầu ra (đồng hồ 24 giờ)
|--|--|--|--
|Mặc định|`<t:1543392060>`|28 Tháng 11, 2018 15:01 SA|28 Tháng 11 2018 15:01
|Thời gian ngắn|`<t:1543392060:t>`|15:01 SA|15:01
|Thời gian dài|`<t:1543392060:T>`|15:01:00 SA|15:01:00
|Ngày ngắn|`<t:1543392060:d>`|11/28/2018|28/11/2018
|Ngày dài|`<t:1543392060:D>`|28 Tháng 11, 2018|28 Tháng 11 2018
|Ngày/Giờ ngắn|`<t:1543392060:f>`|28 Tháng 11, 2018 15:01 SA|28 Tháng 11 2018 15:01
|Ngày/Giờ dài|`<t:1543392060:F>`|Thứ Tư, 28 Tháng 11, 2018 15:01 SA|Thứ Tư, 28 Tháng 11 2018 15:01
|Thời gian tương đối|`<t:1543392060:R>`|6 năm trước|6 năm trước

Đầu ra 12 giờ hoặc 24 giờ phụ thuộc vào cài đặt ngôn ngữ Discord của bạn. Ví dụ, nếu bạn đã cài đặt ngôn ngữ Discord của mình là Tiếng Anh, Mỹ, bạn sẽ nhận được đầu ra 12 giờ. Nếu ngôn ngữ Discord của bạn là Tiếng Anh, Anh, bạn sẽ nhận được đầu ra 24 giờ. Ngôn ngữ Tiếng Việt sử dụng đồng hồ 24 giờ.

## Cách để tag một số ID

Chúng ta hãy gán:

- `user_id`: ID người dùng, ví dụ là `906844267870314577`
- `channel_id`: ID kênh, ví dụ là `1096028188976619523`
- `command_id`: ID lệnh slash, ví dụ là `1147727553373683752`

|Kiểu|Ví dụ|Đầu ra
|--|--|--
|`<@user_id>`|`<@906844267870314577>`|**@Ankita Tudubucket**
|`<#channel_id>`|`<#906844267870314577>`|**#general**
|`<id:customize>`|`<id:customize>`|Hướng tới phần Chọn kênh & vai trò (Channels & Roles)
|`<id:browse>`|`<id:browse>`|Hướng tới phần Chọn hiển thị các kênh
|`<id:guide>`|`<id:guide>`|Hướng tới phần Hướng dẫn Máy chủ (Server Guide)
|`</command:id>`|`</artwork:1147727553373683752>`:n `</report recent:1192112079977582672>`|Đề cập tới 1 lênh slash (Bạn có thể bấm vào để trực tiếp sử dụng)

:::note[Note]
Bạn có thể thêm kí tự `\` ở đằng trước để chuyển từ kiểu **đã đề cập** sang loại kí tự bình thường.

Ví dụ, bạn có một emoji là `:emoji:`, bạn có thể thêm `\` như `\:emoji:` để biến nó trở thành `<:emoji:1176462510690414646>`.

Phương pháp này có thể sử dụng để lấy một số Emoji nguyên bản cho GlitchBucket, cũng như áp dụng cho mọi loại mention.
:::

Bạn có thể xem tất cả tại [Trang Tài liệu Discord Developer](https://discord.com/developers/docs/reference#message-formatting)

## Danh sách các quyền

| Permission    | Tên   | Chức năng                   |
|----------------------------|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `ADD_REACTIONS`            | Thêm Phản Ứng           | Thêm emoji mới vào tin nhắn. Nếu quyền này bị tắt, thành viên vẫn có thể sử dụng các phản ứng đã có sẵn trên tin nhắn. |
| `ADMINISTRATOR`            | Quản Trị Viên           | Thành viên có quyền này sẽ có tất cả các quyền và bỏ qua mọi hạn chế quyền riêng biệt của kênh (ví dụ, họ sẽ có quyền truy cập tất cả các kênh riêng tư). **Đây là một quyền nguy hiểm.** |
| `ATTACH_FILES`             | Đính Kèm Tập Tin        | Tải lên tệp hoặc phương tiện trong kênh văn bản. |
| `BAN_MEMBERS`              | Cấm Thành Viên          | Cấm vĩnh viễn và xóa lịch sử tin nhắn của các thành viên khác khỏi máy chủ. |
| `CHANGE_NICKNAME`          | Thay Đổi Biệt Danh      | Thay đổi biệt danh của chính họ, một cái tên tùy chỉnh chỉ dành cho máy chủ này. |
| `CONNECT`                  | Kết Nối                 | Tham gia kênh thoại và nghe người khác nói chuyện. |
| `CREATE_EVENTS`            | Tạo Sự Kiện             | Cho phép tạo sự kiện.           |
| `CREATE_EXPRESSIONS`       | Tạo Biểu Tượng          | Thêm emoji, sticker và âm thanh tùy chỉnh trong máy chủ.       |
| `CREATE_INSTANT_INVITE`    | Tạo Lời Mời             | Mời người mới vào máy chủ này. |
| `CREATE_POLLS`             | Tạo Khảo Sát            | Cho phép tạo khảo sát. |
| `CREATE_PRIVATE_THREADS`   | Tạo Chủ Đề Riêng Tư     | Tạo các chủ đề chỉ được mời.               |
| `CREATE_PUBLIC_THREADS`    | Tạo Chủ Đề Công Khai    | Tạo các chủ đề mà mọi người trong kênh đều có thể xem.          |
| `DEAFEN_MEMBERS`           | Bịt Tai Thành Viên      | Tắt tiếng các thành viên khác trong kênh thoại, nghĩa là họ sẽ không thể nói hoặc nghe người khác.         |
| `EMBED_LINKS`              | Nhúng Liên Kết          | Các liên kết mà thành viên chia sẻ hiển thị nội dung được nhúng trong kênh văn bản.            |
| `EXTERNAL_EMOJIS`          | Sử Dụng Emoji Ngoài     | Sử dụng emoji từ các máy chủ khác nếu họ là thành viên Discord Nitro.               |
| `EXTERNAL_STICKERS`        | Sử Dụng Sticker Ngoài   | Sử dụng sticker từ các máy chủ khác nếu họ là thành viên Discord Nitro.             |
| `KICK_MEMBERS`             | Đuổi Thành Viên         | Loại bỏ các thành viên khác khỏi máy chủ. Những thành viên bị đuổi có thể tham gia lại nếu họ có lời mời khác. |
| `MANAGE_CHANNELS`          | Quản Lý Kênh            | Tạo, chỉnh sửa hoặc xóa kênh.              |
| `MANAGE_EMOJIS`            | Quản Lý Biểu Tượng      | Chỉnh sửa hoặc xóa emoji, sticker và âm thanh tùy chỉnh trong máy chủ.             |
| `MANAGE_EVENTS`            | Quản Lý Sự Kiện         | Chỉnh sửa và hủy các sự kiện.              |
| `MANAGE_GUILD`             | Quản Lý Máy Chủ         | Thay đổi tên máy chủ, chuyển vùng, xem tất cả các lời mời, thêm ứng dụng vào máy chủ và tạo hoặc cập nhật các quy tắc AutoMod. |
| `MANAGE_MESSAGES`          | Quản Lý Tin Nhắn        | Xóa tin nhắn của người khác hoặc ghim bất kỳ tin nhắn nào.      |
| `MANAGE_NICKNAMES`         | Quản Lý Biệt Danh       | Thay đổi biệt danh của các thành viên khác.|
| `MANAGE_ROLES`             | Quản Lý Vai Trò         | Tạo vai trò mới, chỉnh sửa hoặc xóa các vai trò thấp hơn vai trò cao nhất của họ. Cũng thay đổi quyền của các kênh mà họ có quyền truy cập.        |
| `MANAGE_WEBHOOKS`          | Quản Lý Webhook         | Tạo, chỉnh sửa hoặc xóa webhook, có thể đăng tin nhắn từ các ứng dụng hoặc trang web khác vào máy chủ này.                   |
| `MENTION_EVERYONE`         | Nhắc Tất Cả Mọi Người   | Sử dụng @everyone (tất cả mọi người trong máy chủ) hoặc @here (chỉ những người trực tuyến trong kênh đó).|
| `MODERATE_MEMBERS`         | Quản Lý Thành Viên      | Khi đặt một người dùng vào timeout, họ sẽ không thể gửi tin nhắn, trả lời trong chủ đề, phản ứng với tin nhắn hoặc nói trong kênh thoại hoặc Stage. |
| `MOVE_MEMBERS`             | Di Chuyển Thành Viên    | Ngắt kết nối hoặc di chuyển các thành viên khác giữa các kênh thoại mà thành viên có quyền truy cập.     |
| `MUTE_MEMBERS`             | Tắt Tiếng Thành Viên    | Tắt tiếng các thành viên khác trong kênh thoại cho tất cả mọi người.                |
| `PRIORITY_SPEAKER`         | Loa Ưu Tiên             | Dễ dàng được nghe hơn trong kênh thoại. Khi được kích hoạt, âm lượng của những người không có quyền này sẽ tự động giảm. |
| `READ_MESSAGE_HISTORY`     | Đọc Lịch Sử Tin Nhắn    | Đọc các tin nhắn đã gửi trước đó trong kênh. Nếu quyền này bị tắt, thành viên chỉ thấy tin nhắn được gửi khi họ trực tuyến và tập trung vào kênh đó. |
| `READ_MESSAGES`            | Đọc Tin Nhắn            | Xem kênh và tin nhắn trong máy chủ này. |
| `REQUEST_TO_SPEAK`         | Yêu Cầu Phát Biểu       | Yêu cầu phát biểu trong các kênh Stage. Các người điều hành Stage phê duyệt hoặc từ chối từng yêu cầu. |
| `SEND_MESSAGES`            | Gửi Tin Nhắn            | Gửi tin nhắn trong kênh văn bản. |
| `SEND_TTS_MESSAGES`        | Gửi Tin Nhắn TTS        | Gửi tin nhắn văn bản thành giọng nói bằng cách bắt đầu tin nhắn bằng /tts. |
| `SEND_VOICE_MESSAGES`      | Gửi Tin Nhắn Âm Thanh   | Gửi tin nhắn âm thanh. |
| `SPEAK`                    | Nói                     | Nói chuyện trong kênh thoại. Nếu quyền này bị tắt, thành viên sẽ bị mặc định tắt tiếng cho đến khi có người có quyền tắt tiếng thành viên bật lại. |
| `STREAM`                   | Phát Trực Tiếp          | Chia sẻ video, màn hình hoặc phát trực tiếp trò chơi trong máy chủ này.             |
| `USE_APPLICATION_COMMANDS` | Sử Dụng Lệnh Ứng Dụng   | Thành viên có quyền này có thể sử dụng các lệnh từ ứng dụng, bao gồm lệnh dấu gạch chéo và lệnh menu ngữ cảnh. |
| `USE_EMBEDDED_ACTIVITIES`  | Sử Dụng Hoạt Động       | Sử dụng Hoạt động (Activities).    |
| `USE_EXTERNAL_APPS`        | Sử Dụng Ứng Dụng Ngoài  | Cho phép sử dụng các ứng dụng mà thành viên đã thêm vào tài khoản đăng tin nhắn. Khi bị tắt, tin nhắn sẽ là riêng tư. |
| `VIEW_AUDIT_LOG`           | Xem Nhật Ký Kiểm Tra    | Xem nhật ký các thay đổi đã thực hiện trong máy chủ này.        |
| `VIEW_CHANNEL`             | Xem Kênh                | Xem các kênh theo mặc định (trừ các kênh riêng tư).            |
