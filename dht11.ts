/*
Copyright (C): 2010-2020, Shenzhen Yahboom Tech
modified from wujianzhang
load dependency
"dht11": "file:../pxt-dht11"
*/


//% weight=0 color=#3CB371 icon="\uf043" block="dht11"
namespace dht11 {


    export enum DHT11Type {
        //% block="temperature(℃)" enumval=0
        DHT11_temperature_C,

        //% block="temperature(℉)" enumval=1
        DHT11_temperature_F,

        //% block="humidity(0~100)" enumval=2
        DHT11_humidity,
    }

 //% blockId="readdht11" block="value of dht11 %dht11type| at pin %dht11pin"
    export function dht11value(dht11type: DHT11Type, dht11pin: DigitalPin): number {

    pins.digitalWritePin(dht11pin, 0)
    basic.pause(18)
    let i = pins.digitalReadPin(dht11pin)
    pins.setPull(dht11pin, PinPullMode.PullUp);
    switch (dht11type) {
        case 0:
            let dhtvalue1 = 0;
            let dhtcounter1 = 0;
            let dhtcounter1d = 0;
            while (pins.digitalReadPin(dht11pin) == 1);
            while (pins.digitalReadPin(dht11pin) == 0);
            while (pins.digitalReadPin(dht11pin) == 1);
            for (let i = 0; i <= 32 - 1; i++) {
                dhtcounter1d = 0
                while (pins.digitalReadPin(dht11pin) == 0)
                {
                    dhtcounter1d += 1;
                }
                dhtcounter1 = 0
                while (pins.digitalReadPin(dht11pin) == 1) {
                    dhtcounter1 += 1;
                }
                if (i > 15) {
                    if (dhtcounter1 > dhtcounter1d) {
                        dhtvalue1 = dhtvalue1 + (1 << (31 - i));
                    }
                }
            }
            return ((dhtvalue1 & 0x0000ff00) >> 8);
            break;
        case 1:
            while (pins.digitalReadPin(dht11pin) == 1);
            while (pins.digitalReadPin(dht11pin) == 0);
            while (pins.digitalReadPin(dht11pin) == 1);
            let dhtvalue = 0;
            let dhtcounter = 0;
            let dhtcounterd = 0;
            for (let i = 0; i <= 32 - 1; i++) {
                dhtcounterd = 0
                while (pins.digitalReadPin(dht11pin) == 0) {
                    dhtcounterd += 1;
                }
                dhtcounter = 0
                while (pins.digitalReadPin(dht11pin) == 1) {
                    dhtcounter += 1;
                }
                if (i > 15) {
                    if (dhtcounter > dhtcounterd) {
                        dhtvalue = dhtvalue + (1 << (31 - i));
                    }
                }
            }
            return Math.round((((dhtvalue & 0x0000ff00) >> 8) * 9 / 5) + 32);
        case 2:
            while (pins.digitalReadPin(dht11pin) == 1);
            while (pins.digitalReadPin(dht11pin) == 0);
            while (pins.digitalReadPin(dht11pin) == 1);

            let value = 0;
            let counter = 0;
            let counterd = 0;
            for (let i = 0; i <= 8 - 1; i++) {
                counterd = 0
                while (pins.digitalReadPin(dht11pin) == 0)
                {
                    counterd += 1;
                }
                counter = 0
                while (pins.digitalReadPin(dht11pin) == 1) {
                    counter += 1;
                }
                if (counter > counterd) {
                    value = value + (1 << (7 - i));
                }
            }
            return value;
        default:
            return 0;
    }
    }

}
