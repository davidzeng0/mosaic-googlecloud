# mosaic-googlecloud
Google Cloud OAuth + APIs

```bash
npm i github:davidzeng0/mosaic-googlecloud#dist
```

## Using a config file
Create a config file in your project named `mosaic_config.yaml`, and call
```ts
import { Config } from 'mosaic';

Config.use('mosaic_config.yaml');
```

The file `mosaic_config.example.yaml` contains a sample config which<br>
can be used by copying it and renaming it to `mosaic_config.yaml`

## Building

### Dependencies
1. cmake + make/ninja
2. protobuf-compiler
3. a lot of ram