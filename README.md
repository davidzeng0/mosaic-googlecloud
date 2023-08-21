# mosaic-googlecloud
A collection of API and OAuth 2.0 clients

```bash
npm i github:davidzeng0/mosaic-googlecloud#dist
```

## Using a config file
Create a config file in your project named `config.yaml`, and call
```ts
import { Config } from 'mosaic';

Config.use('config.yaml');
```

The file `config.example.yaml` contains a sample config which<br>
can be used by copying it and renaming it to `config.yaml`

## Building

### Dependencies
1. cmake + make/ninja
2. protobuf-compiler
3. a lot of ram