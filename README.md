
# Abby

project deployed at: [rdapkuns.github.io/Integration4](https://rdapkuns.github.io/Integration4/)

## The team
### Devine
- Arina Holodkova
- Diana Moreno
- Lina Kausch
- Rūdolfs Dapkuns

### CMD
- Ziggy Engel
- Mikko Helin

## To run the project locally
1. Generate a key and certificate by pasting this command in terminal (only for the first install)
```
  openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
   ```

2. Run `npm install` in terminal  (only for the first install)
3. Run `npm run dev` for development or `npm run preview` for the current build

## System requirements
- Built for Mobile
- Internet connection required
- Recommended browsers: Safari (for IOS) or Chrome (for Android)
- The app might ask for camera permission on initial launch (accept to proceed)

## Other files for this project
- [Figma - Wireframes](https://www.figma.com/design/hpnZ5fIzVRzWYJl8CM4RLh/Wireframes?node-id=1342-2988&t=CVxaNPdlnV4cRkK8-1)
- [Figjam - Planning, Analising](https://www.figma.com/design/hpnZ5fIzVRzWYJl8CM4RLh/Wireframes?node-id=1342-2988&t=CVxaNPdlnV4cRkK8-1)
- [Figma - Microsite](https://www.figma.com/design/L1SZGLsLNkRkEeAQk5ssZJ/One-pager?node-id=0-1&t=e2ZHxqmCwE8D584l-1)
- [Figma - Posters, instagram posts](https://www.figma.com/design/6v2Na32qft02xglW6y7fxn/Ads?node-id=0-1&t=VDGMwK52fISsp7Mq-1)