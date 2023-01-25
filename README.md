<div align="center" style="padding-bottom: 20px">
    <h1>Beerdegu Mobile</h1>
    <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt=""/>
    <img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/Javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt=""/>
</div>

<div style="padding-bottom: 20px">
Beerdegu is a real-time mobile application meant for beer tasting sessions, when you and your friends are rating every consumed beer (color, smell, taste etc.).
</div>

## Used tools and libraries:

- `expo` - development platform
- React & React Native: `react-native`
- `react-navigation` - navigation
- `native-base` - UI library
- `axios` - http requests client
- `@tanstack/react-query` - client-side data fetching and caching
- `react-native-use-websocket` - websocket client
- `react-use-form`, `@hookform/resolvers`, `zod` - form state and validation

## Development setup

### Requirements:

- `node`
- `expo-cli`
- account at https://expo.dev/
- _Expo Go_ mobile app

Run expo in terminal

```bash
npx expo start
```

or

```bash
yarn start
```

Open Expo Go app, sign in and click on the `beerdegu` project. You should be able to preview your application.

## Setup connection with the backend

In `src/config.ts` change host ip value inside the array to your internal ip4 address. You can retrieve it by running `ipconfig` in terminal and looking for `IPv4 Address`.

```typescript
const [HOST_IP, HOST_PORT] = ["CHANGE_THIS_IP_ADDRESS", "8000"];
```
