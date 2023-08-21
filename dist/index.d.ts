import { GenericError, KV } from 'js-common';
import { OAuth, Client } from 'mosaic';
import _m0 from 'protobufjs/minimal';

declare enum GoogleAuthErrors {
    CLIENT_LOGIN_DISABLED = "ClientLoginDisabled",
    SOCKET_TIMEOUT = "SocketTimeout",
    SUCCESS = "Ok",
    UNKNOWN_ERROR = "UNKNOWN_ERR",
    NETWORK_ERROR = "NetworkError",
    SERVICE_UNAVAILABLE = "ServiceUnavailable",
    INTERNAL_ERROR = "InternalError",
    ILLEGAL_ARGUMENT = "IllegalArgument",
    BAD_AUTHENTICATION = "BadAuthentication",
    BAD_TOKEN_REQUEST = "BAD_REQUEST",
    EMPTY_CONSUMER_PKG_OR_SIG = "EmptyConsumerPackageOrSig",
    NEEDS_2F = "InvalidSecondFactor",
    NEEDS_POST_SIGN_IN_FLOW = "PostSignInFlowRequired",
    NEEDS_BROWSER = "NeedsBrowser",
    UNKNOWN = "Unknown",
    NOT_VERIFIED = "NotVerified",
    TERMS_NOT_AGREED = "TermsNotAgreed",
    ACCOUNT_DISABLED = "AccountDisabled",
    CAPTCHA = "CaptchaRequired",
    ACCOUNT_DELETED = "AccountDeleted",
    SERVICE_DISABLED = "ServiceDisabled",
    CHALLENGE_REQUIRED = "ChallengeRequired",
    NEED_PERMISSION = "NeedPermission",
    NEED_REMOTE_CONSENT = "NeedRemoteConsent",
    INVALID_SCOPE = "INVALID_SCOPE",
    USER_CANCEL = "UserCancel",
    PERMISSION_DENIED = "PermissionDenied",
    RESTRICTED_CLIENT = "RESTRICTED_CLIENT",
    INVALID_AUDIENCE = "INVALID_AUDIENCE",
    UNREGISTERED_ON_API_CONSOLE = "UNREGISTERED_ON_API_CONSOLE",
    THIRD_PARTY_DEVICE_MANAGEMENT_REQUIRED = "ThirdPartyDeviceManagementRequired",
    DM_INTERNAL_ERROR = "DeviceManagementInternalError",
    DM_SYNC_DISABLED = "DeviceManagementSyncDisabled",
    DM_ADMIN_BLOCKED = "DeviceManagementAdminBlocked",
    DM_ADMIN_PENDING_APPROVAL = "DeviceManagementAdminPendingApproval",
    DM_STALE_SYNC_REQUIRED = "DeviceManagementStaleSyncRequired",
    DM_DEACTIVATED = "DeviceManagementDeactivated",
    DM_SCREENLOCK_REQUIRED = "DeviceManagementScreenlockRequired",
    DM_REQUIRED = "DeviceManagementRequired",
    DEVICE_MANAGEMENT_REQUIRED = "DeviceManagementRequiredOrSyncDisabled",
    ALREADY_HAS_GMAIL = "ALREADY_HAS_GMAIL",
    BAD_PASSWORD = "WeakPassword",
    BAD_REQUEST = "BadRequest",
    BAD_USERNAME = "BadUsername",
    DELETED_GMAIL = "DeletedGmail",
    EXISTING_USERNAME = "ExistingUsername",
    LOGIN_FAIL = "LoginFail",
    NOT_LOGGED_IN = "NotLoggedIn",
    NO_GMAIL = "NoGmail",
    REQUEST_DENIED = "RequestDenied",
    SERVER_ERROR = "ServerError",
    USERNAME_UNAVAILABLE = "UsernameUnavailable",
    GPLUS_OTHER = "GPlusOther",
    GPLUS_NICKNAME = "GPlusNickname",
    GPLUS_INVALID_CHAR = "GPlusInvalidChar",
    GPLUS_INTERSTITIAL = "GPlusInterstitial",
    GPLUS_PROFILE_ERROR = "ProfileUpgradeError",
    AUTH_SECURITY_ERROR = "AuthSecurityError",
    AUTH_BINDING_ERROR = "AuthBindingError"
}
declare class GoogleAuthError extends OAuth.OAuthError {
    static from(error: string): GenericError;
}

/** uaq */
interface AndroidIntentProto {
    action?: string | undefined;
    dataUri?: string | undefined;
    mimeType?: string | undefined;
    extra?: AndroidIntentProto_Extra[] | undefined;
    unnamedField8?: string | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const AndroidIntentProto: {
    encode(message: AndroidIntentProto, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AndroidIntentProto;
    fromJSON(object: any): AndroidIntentProto;
    toJSON(message: AndroidIntentProto): unknown;
};
/** uap */
interface AndroidIntentProto_Extra {
    name?: string | undefined;
    value?: string | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const AndroidIntentProto_Extra: {
    encode(message: AndroidIntentProto_Extra, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AndroidIntentProto_Extra;
    fromJSON(object: any): AndroidIntentProto_Extra;
    toJSON(message: AndroidIntentProto_Extra): unknown;
};

/** tzz */
interface GservicesSetting {
    name?: Buffer | undefined;
    value?: Buffer | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const GservicesSetting: {
    encode(message: GservicesSetting, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GservicesSetting;
    fromJSON(object: any): GservicesSetting;
    toJSON(message: GservicesSetting): unknown;
};

/** tzx */
interface AndroidCheckinResponse {
    statsOk?: boolean | undefined;
    intent?: AndroidIntentProto[] | undefined;
    timeMsec?: bigint | undefined;
    setting?: GservicesSetting[] | undefined;
    androidId?: bigint | undefined;
    securityToken?: bigint | undefined;
    settingsDiff?: boolean | undefined;
    unnamedField11?: string | undefined;
    unnamedField12?: string | undefined;
    unnamedField13?: string[] | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const AndroidCheckinResponse: {
    encode(message: AndroidCheckinResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AndroidCheckinResponse;
    fromJSON(object: any): AndroidCheckinResponse;
    toJSON(message: AndroidCheckinResponse): unknown;
};

/** tzv */
declare enum Unnamed8449 {
    NO_RESTRICTION = "NO_RESTRICTION",
    SW_DEVICE = "SW_DEVICE",
    LATCHSKY_DEVICE = "LATCHSKY_DEVICE",
    UNRECOGNIZED = "UNRECOGNIZED"
}

/** tzy */
interface Unnamed8452 {
    unnamedField1?: string | undefined;
    unnamedField2?: string | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const Unnamed8452: {
    encode(message: Unnamed8452, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Unnamed8452;
    fromJSON(object: any): Unnamed8452;
    toJSON(message: Unnamed8452): unknown;
};

/** uaa */
interface Unnamed8454 {
    unnamedField1?: string | undefined;
    unnamedField2?: Buffer | undefined;
    unnamedField5?: Buffer | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const Unnamed8454: {
    encode(message: Unnamed8454, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Unnamed8454;
    fromJSON(object: any): Unnamed8454;
    toJSON(message: Unnamed8454): unknown;
};

/** uaj.a */
declare enum Unnamed10361 {
    Unnamed10361_value_0 = "Unnamed10361_value_0",
    Unnamed10361_value_1 = "Unnamed10361_value_1",
    Unnamed10361_value_2 = "Unnamed10361_value_2",
    UNRECOGNIZED = "UNRECOGNIZED"
}

/** ual.a */
declare enum Unnamed10362 {
    Unnamed10362_value_0 = "Unnamed10362_value_0",
    Unnamed10362_value_1 = "Unnamed10362_value_1",
    Unnamed10362_value_2 = "Unnamed10362_value_2",
    Unnamed10362_value_3 = "Unnamed10362_value_3",
    Unnamed10362_value_4 = "Unnamed10362_value_4",
    Unnamed10362_value_5 = "Unnamed10362_value_5",
    Unnamed10362_value_6 = "Unnamed10362_value_6",
    Unnamed10362_value_7 = "Unnamed10362_value_7",
    Unnamed10362_value_8 = "Unnamed10362_value_8",
    Unnamed10362_value_9 = "Unnamed10362_value_9",
    Unnamed10362_value_10 = "Unnamed10362_value_10",
    Unnamed10362_value_11 = "Unnamed10362_value_11",
    Unnamed10362_value_12 = "Unnamed10362_value_12",
    Unnamed10362_value_13 = "Unnamed10362_value_13",
    Unnamed10362_value_14 = "Unnamed10362_value_14",
    Unnamed10362_value_15 = "Unnamed10362_value_15",
    Unnamed10362_value_16 = "Unnamed10362_value_16",
    Unnamed10362_value_17 = "Unnamed10362_value_17",
    Unnamed10362_value_18 = "Unnamed10362_value_18",
    Unnamed10362_value_19 = "Unnamed10362_value_19",
    Unnamed10362_value_20 = "Unnamed10362_value_20",
    UNRECOGNIZED = "UNRECOGNIZED"
}

/** uan */
interface Unnamed8460 {
    unnamedField1?: Unnamed10362 | undefined;
    unnamedField2?: number | undefined;
    unnamedField3?: string | undefined;
    unnamedField4?: string | undefined;
    unnamedField5?: boolean | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const Unnamed8460: {
    encode(message: Unnamed8460, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Unnamed8460;
    fromJSON(object: any): Unnamed8460;
    toJSON(message: Unnamed8460): unknown;
};

/** uas */
declare enum Unnamed8464 {
    OTHER = "OTHER",
    PHONE = "PHONE",
    TABLET = "TABLET",
    TV = "TV",
    GLASS = "GLASS",
    CAR = "CAR",
    WEARABLE = "WEARABLE",
    THINGS = "THINGS",
    CHROMEOS_ARC = "CHROMEOS_ARC",
    BSTAR = "BSTAR",
    UNRECOGNIZED = "UNRECOGNIZED"
}

/** uaw.a */
declare enum Unnamed10363 {
    Unnamed10363_value_0 = "Unnamed10363_value_0",
    Unnamed10363_value_1 = "Unnamed10363_value_1",
    Unnamed10363_value_2 = "Unnamed10363_value_2",
    UNRECOGNIZED = "UNRECOGNIZED"
}

/** uax */
interface Unnamed8467 {
    unnamedField1?: string | undefined;
    unnamedField2?: string | undefined;
    unnamedField3?: string | undefined;
    unnamedField4?: Unnamed10363[] | undefined;
    unnamedField6?: string | undefined;
    unnamedField7?: string | undefined;
    unnamedField8?: Buffer | undefined;
    unnamedField9?: number | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const Unnamed8467: {
    encode(message: Unnamed8467, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Unnamed8467;
    fromJSON(object: any): Unnamed8467;
    toJSON(message: Unnamed8467): unknown;
};

/** uah */
interface Unnamed8457 {
    unnamedField1?: string | undefined;
    unnamedField2?: string | undefined;
    unnamedField3?: string | undefined;
    unnamedField4?: string | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const Unnamed8457: {
    encode(message: Unnamed8457, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Unnamed8457;
    fromJSON(object: any): Unnamed8457;
    toJSON(message: Unnamed8457): unknown;
};

/** uau */
declare enum Unnamed8465 {
    BASE_CLIENT_ID = "BASE_CLIENT_ID",
    SEARCH_CLIENT_ID = "SEARCH_CLIENT_ID",
    VOICESEARCH_CLIENT_ID = "VOICESEARCH_CLIENT_ID",
    MAPS_CLIENT_ID = "MAPS_CLIENT_ID",
    YOUTUBE_CLIENT_ID = "YOUTUBE_CLIENT_ID",
    MARKET_CLIENT_ID = "MARKET_CLIENT_ID",
    SHOPPER_CLIENT_ID = "SHOPPER_CLIENT_ID",
    WALLET_CLIENT_ID = "WALLET_CLIENT_ID",
    CHROME_CLIENT_ID = "CHROME_CLIENT_ID",
    PLAYTX_CLIENT_ID = "PLAYTX_CLIENT_ID",
    PLAYAX_CLIENT_ID = "PLAYAX_CLIENT_ID",
    PROGRAM_CLIENT_ID = "PROGRAM_CLIENT_ID",
    UNRECOGNIZED = "UNRECOGNIZED"
}

/** uav */
interface Unnamed8466 {
    unnamedField1?: Unnamed8465 | undefined;
    unnamedField2?: string | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const Unnamed8466: {
    encode(message: Unnamed8466, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Unnamed8466;
    fromJSON(object: any): Unnamed8466;
    toJSON(message: Unnamed8466): unknown;
};

/** uai */
interface AndroidBuildProto {
    id?: string | undefined;
    product?: string | undefined;
    carrier?: string | undefined;
    radio?: string | undefined;
    bootloader?: string | undefined;
    client?: string | undefined;
    timestamp?: bigint | undefined;
    googleServices?: number | undefined;
    device?: string | undefined;
    sdkVersion?: number | undefined;
    model?: string | undefined;
    manufacturer?: string | undefined;
    buildProduct?: string | undefined;
    otaInstalled?: boolean | undefined;
    unnamedField15?: Unnamed8466[] | undefined;
    unnamedField19?: string | undefined;
    unnamedField23?: Unnamed8457[] | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const AndroidBuildProto: {
    encode(message: AndroidBuildProto, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AndroidBuildProto;
    fromJSON(object: any): AndroidBuildProto;
    toJSON(message: AndroidBuildProto): unknown;
};

/** uao */
interface AndroidEventProto {
    tag?: string | undefined;
    value?: string | undefined;
    timeMsec?: bigint | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const AndroidEventProto: {
    encode(message: AndroidEventProto, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AndroidEventProto;
    fromJSON(object: any): AndroidEventProto;
    toJSON(message: AndroidEventProto): unknown;
};

/** uak */
interface AndroidCheckinProto {
    build?: AndroidBuildProto | undefined;
    lastCheckinMsec?: bigint | undefined;
    event?: AndroidEventProto[] | undefined;
    requestedGroup?: string[] | undefined;
    cellOperator?: string | undefined;
    simOperator?: string | undefined;
    roaming?: string | undefined;
    userNumber?: number | undefined;
    unnamedField14?: Unnamed8464 | undefined;
    unnamedField15?: Unnamed8460 | undefined;
    unnamedField16?: Unnamed8467[] | undefined;
    unnamedField18?: boolean | undefined;
    unnamedField19?: string | undefined;
    unnamedField20?: Unnamed10361 | undefined;
    unnamedField21?: number | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const AndroidCheckinProto: {
    encode(message: AndroidCheckinProto, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AndroidCheckinProto;
    fromJSON(object: any): AndroidCheckinProto;
    toJSON(message: AndroidCheckinProto): unknown;
};

/** uae.a */
declare enum Unnamed10357 {
    Unnamed10357_value_0 = "Unnamed10357_value_0",
    Unnamed10357_value_1 = "Unnamed10357_value_1",
    Unnamed10357_value_2 = "Unnamed10357_value_2",
    Unnamed10357_value_3 = "Unnamed10357_value_3",
    UNRECOGNIZED = "UNRECOGNIZED"
}

/** uab.a */
declare enum Unnamed10358 {
    Unnamed10358_value_0 = "Unnamed10358_value_0",
    Unnamed10358_value_1 = "Unnamed10358_value_1",
    Unnamed10358_value_2 = "Unnamed10358_value_2",
    Unnamed10358_value_3 = "Unnamed10358_value_3",
    UNRECOGNIZED = "UNRECOGNIZED"
}

/** uac.a */
declare enum Unnamed10359 {
    Unnamed10359_value_0 = "Unnamed10359_value_0",
    Unnamed10359_value_1 = "Unnamed10359_value_1",
    Unnamed10359_value_2 = "Unnamed10359_value_2",
    Unnamed10359_value_3 = "Unnamed10359_value_3",
    Unnamed10359_value_4 = "Unnamed10359_value_4",
    UNRECOGNIZED = "UNRECOGNIZED"
}

/** uad.a */
declare enum Unnamed10360 {
    Unnamed10360_value_0 = "Unnamed10360_value_0",
    Unnamed10360_value_1 = "Unnamed10360_value_1",
    Unnamed10360_value_2 = "Unnamed10360_value_2",
    Unnamed10360_value_3 = "Unnamed10360_value_3",
    Unnamed10360_value_4 = "Unnamed10360_value_4",
    UNRECOGNIZED = "UNRECOGNIZED"
}

/** uag */
interface Unnamed8456 {
    unnamedField1?: string | undefined;
    unnamedField2?: number | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const Unnamed8456: {
    encode(message: Unnamed8456, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Unnamed8456;
    fromJSON(object: any): Unnamed8456;
    toJSON(message: Unnamed8456): unknown;
};

/** uaf */
interface DeviceConfigurationProto {
    touchScreen?: Unnamed10357 | undefined;
    keyboard?: Unnamed10358 | undefined;
    navigation?: Unnamed10359 | undefined;
    screenLayout?: Unnamed10360 | undefined;
    hasHardKeyboard?: boolean | undefined;
    hasFiveWayNavigation?: boolean | undefined;
    screenDensity?: number | undefined;
    glEsVersion?: number | undefined;
    systemSharedLibrary?: string[] | undefined;
    systemAvailableFeature?: string[] | undefined;
    nativePlatform?: string[] | undefined;
    screenWidth?: number | undefined;
    screenHeight?: number | undefined;
    systemSupportedLocale?: string[] | undefined;
    glExtension?: string[] | undefined;
    unnamedField18?: number | undefined;
    unnamedField19?: boolean | undefined;
    unnamedField20?: bigint | undefined;
    unnamedField21?: number | undefined;
    unnamedField26?: Unnamed8456[] | undefined;
    unnamedField28?: boolean | undefined;
    unnamedField29?: string | undefined;
    unnamedField30?: Unnamed10360 | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const DeviceConfigurationProto: {
    encode(message: DeviceConfigurationProto, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DeviceConfigurationProto;
    fromJSON(object: any): DeviceConfigurationProto;
    toJSON(message: DeviceConfigurationProto): unknown;
};

/** tzw */
interface AndroidCheckinRequest {
    imei?: string | undefined;
    id?: bigint | undefined;
    digest?: string | undefined;
    checkin?: AndroidCheckinProto | undefined;
    locale?: string | undefined;
    macAddr?: string[] | undefined;
    meid?: string | undefined;
    accountCookie?: string[] | undefined;
    timeZone?: string | undefined;
    securityToken?: bigint | undefined;
    version?: number | undefined;
    otaCert?: string[] | undefined;
    serialNumber?: string | undefined;
    esn?: string | undefined;
    deviceConfiguration?: DeviceConfigurationProto | undefined;
    macAddrType?: string[] | undefined;
    fragment?: number | undefined;
    userSerialNumber?: number | undefined;
    unnamedField23?: Unnamed8454 | undefined;
    unnamedField24?: string | undefined;
    unnamedField25?: string | undefined;
    unnamedField26?: Unnamed8449 | undefined;
    unnamedField27?: Unnamed8452 | undefined;
    unnamedField29?: boolean | undefined;
    unnamedField30?: boolean | undefined;
    unnamedField31?: boolean | undefined;
    _unknownFields?: {
        [key: number]: Uint8Array[];
    } | undefined;
}
declare const AndroidCheckinRequest: {
    encode(message: AndroidCheckinRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AndroidCheckinRequest;
    fromJSON(object: any): AndroidCheckinRequest;
    toJSON(message: AndroidCheckinRequest): unknown;
};

interface DeviceConfig {
    imei?: string;
    otaCert?: string;
    model?: string;
    manufacturer?: string;
    device?: string;
    client?: string;
    bootloader?: string;
    radio?: string;
    carrier?: string;
    product?: string;
    id?: string;
}
declare function checkin(request: AndroidCheckinRequest): Promise<AndroidCheckinResponse>;
declare function createAndroidId(config: DeviceConfig, request?: AndroidCheckinRequest): Promise<{
    response: AndroidCheckinResponse;
    androidId: string;
}>;

interface AndroidApp {
    name: string;
    signature: string;
}
interface GoogleAuthService {
    auth(form: KV<any>): Promise<Map<string, string>>;
}
declare const GOOGLE_PLAY_SERVICES_VERSION = 225014000;
declare class Auth {
    private constructor();
    private static authService;
    private static oauth;
    static login(code: string): Promise<{
        secret: string;
        email: string;
        firstName: string | undefined;
        lastName: string | undefined;
        accountId: string | undefined;
    }>;
    static issueToken(androidId: string, app: AndroidApp, refreshToken: string, scopes: OAuth.Scope[]): Promise<{
        secret: string;
        expire: number | undefined;
        scopes: string[];
    }>;
}

type index$2_AndroidApp = AndroidApp;
type index$2_Auth = Auth;
declare const index$2_Auth: typeof Auth;
type index$2_DeviceConfig = DeviceConfig;
declare const index$2_GOOGLE_PLAY_SERVICES_VERSION: typeof GOOGLE_PLAY_SERVICES_VERSION;
type index$2_GoogleAuthError = GoogleAuthError;
declare const index$2_GoogleAuthError: typeof GoogleAuthError;
type index$2_GoogleAuthErrors = GoogleAuthErrors;
declare const index$2_GoogleAuthErrors: typeof GoogleAuthErrors;
type index$2_GoogleAuthService = GoogleAuthService;
declare const index$2_checkin: typeof checkin;
declare const index$2_createAndroidId: typeof createAndroidId;
declare namespace index$2 {
  export {
    index$2_AndroidApp as AndroidApp,
    index$2_Auth as Auth,
    index$2_DeviceConfig as DeviceConfig,
    index$2_GOOGLE_PLAY_SERVICES_VERSION as GOOGLE_PLAY_SERVICES_VERSION,
    index$2_GoogleAuthError as GoogleAuthError,
    index$2_GoogleAuthErrors as GoogleAuthErrors,
    index$2_GoogleAuthService as GoogleAuthService,
    index$2_checkin as checkin,
    index$2_createAndroidId as createAndroidId,
  };
}

declare class AndroidOAuth extends OAuth.OAuthIssuer {
    private androidIdPromise?;
    private getAndroidId;
    private login;
    private issue;
    perform(client: OAuth.OAuthClient, scopes: OAuth.Scope[], options?: OAuth.OAuthOptions): Promise<OAuth.AccessToken>;
    exchange(code: string, client: OAuth.OAuthClient): Promise<OAuth.AccessToken>;
    refresh(access: OAuth.AccessToken, refresh: OAuth.RefreshToken): Promise<OAuth.AccessToken>;
    revoke(access: OAuth.AccessToken): Promise<void>;
}

type index$1_AndroidOAuth = AndroidOAuth;
declare const index$1_AndroidOAuth: typeof AndroidOAuth;
declare namespace index$1 {
  export {
    index$1_AndroidOAuth as AndroidOAuth,
  };
}

declare namespace index {
  export {
    index$1 as Android,
  };
}

interface ServiceConfig {
    id: string;
    defaultHost?: string;
}
interface GoogleOAuthClient {
    id: string;
    package?: string;
    bundle?: string;
    fingerprint?: string;
    secret?: string;
    redirectUri?: string;
}
interface Project {
    name: string;
    resourceNumber?: string;
    oauth?: OAuth.OAuthConfig[];
    keys?: string[];
    apis?: ServiceConfig[];
    clients?: GoogleOAuthClient[];
}
declare class ProjectRegistry {
    private provider;
    private projects;
    constructor(provider?: OAuth.OAuthProvider);
    registerProjects(projects: Project[]): void;
    getProject(name: string): Project;
}
declare const DefaultProjectRegistry: ProjectRegistry;

declare class GoogleCookie extends Client.Credentials {
    private cookies;
    private string;
    readonly authuser: number;
    constructor(cookies: string, authuser?: number);
    getAuthorization(origin: string, https?: boolean, time?: number): string;
    getCookie(): string;
}

export { DefaultProjectRegistry, GoogleCookie, GoogleOAuthClient, index$2 as MobileServices, index as OAuth, Project, ProjectRegistry, ServiceConfig };
