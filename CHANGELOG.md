#### 0.1.5 (2019-06-19)

##### Chores

* **deps:**  force latest version & audit fix ([605e13ea](https://github.com/lykmapipo/file/commit/605e13eaaddebf5d837f4ef7b7b8ee788280d7b3))

#### 0.1.4 (2019-06-16)

##### Chores

* **deps:**  force latest version & audit fix ([aa3a7f82](https://github.com/lykmapipo/file/commit/aa3a7f82170d5b49906d10dc51b81de1f71a46ed))

##### New Features

*  expose file length on autopopulate ([5391fffa](https://github.com/lykmapipo/file/commit/5391fffa958582e7953211e9f15939c8278c2315))

#### 0.1.3 (2019-06-12)

##### Chores

* **deps:**
  *  force latest version & audit fix ([10c8cabe](https://github.com/lykmapipo/file/commit/10c8cabeb3b807aa4a6b9c85790df7e12c403749))
  *  force latest version & audit fix ([d94331c7](https://github.com/lykmapipo/file/commit/d94331c7d20efa8e5778aadb03c4873d2ee6a853))

#### 0.1.2 (2019-06-10)

##### Chores

* **deps:**  force latest version & audit fix ([b3509f8b](https://github.com/lykmapipo/file/commit/b3509f8b094e61dc73cc309cf49a93005a79aecb))

#### 0.1.1 (2019-06-08)

##### Chores

* **deps:**  force latest version & audit fix ([e9024900](https://github.com/lykmapipo/file/commit/e90249008715d7aa929b6314d83ead5a38fb2553))

#### 0.1.0 (2019-06-06)

##### Chores

*  improve usage examples ([cfae09e8](https://github.com/lykmapipo/file/commit/cfae09e8ac26f17fa4dff370406d6875ffdadc37))
*  setup project structure and dependencies ([69ada11e](https://github.com/lykmapipo/file/commit/69ada11ed1751dc93d72bae1fcc44d5cbde3350a))
* **deps:**
  *  force latest version & audit fix ([904a94b1](https://github.com/lykmapipo/file/commit/904a94b16f2408f8beafb48110696e61f1325c45))
  *  force latest version & audit fix ([66b5d3af](https://github.com/lykmapipo/file/commit/66b5d3af2634cbc31760ac8bf34766d390ce28bd))
  *  force latest version & audit fix ([e47a63fd](https://github.com/lykmapipo/file/commit/e47a63fd1f8318cd156aaa17d99e524ffc0d7140))
  *  force latest version & audit fix ([46c5ee21](https://github.com/lykmapipo/file/commit/46c5ee21b5c3522f73b1ca78ea8e0e1d3b7f4701))
  *  force latest version & audit fix ([bf76c477](https://github.com/lykmapipo/file/commit/bf76c477a486accf831f2ddad201a7eb0e339ef1))
  *  force latest version & audit fix ([ed67288b](https://github.com/lykmapipo/file/commit/ed67288bca0164e29921ae24c0d6b51b65bf8690))
  *  add required dependencies ([d65f1bd0](https://github.com/lykmapipo/file/commit/d65f1bd068eb9601b335cc8fbb4207ae66c1fc29))
* **examples:**
  *  add clear before seed ([15307292](https://github.com/lykmapipo/file/commit/1530729272d488f395441af0631d61622bd56dcd))
  *  add common bucket file seeds ([4013760b](https://github.com/lykmapipo/file/commit/4013760b2f5e7e2a69caa367b4da9c4d2b1bd18f))
  *  refactor to expose correct api paths ([948aba47](https://github.com/lykmapipo/file/commit/948aba4781b6bb3d1659ad1f09457aad505eb9a6))

##### Documentation Changes

*  improve usage docs ([d6777ae0](https://github.com/lykmapipo/file/commit/d6777ae0cb4ec3bed0bb9dcbb9a2f0b7e6e8f858))
*  remove unused environment options ([e8af2722](https://github.com/lykmapipo/file/commit/e8af2722648b6251d3b975f9569e1a5357f29aed))
*  improve usage docs ([6d836136](https://github.com/lykmapipo/file/commit/6d836136c707c6910297c9ad59720afb7e8daa6e))

##### New Features

*  implement uploaderFor to handle file uploads for a give path ([59789024](https://github.com/lykmapipo/file/commit/59789024959bb776faf05dfa43945a1327ae3268))
*  implement bucketUploaderFor and uploadErrorFor helpers ([bf9522c2](https://github.com/lykmapipo/file/commit/bf9522c271ef56fc8a84a2cfbdbe49b04a344f62))
*  plugin stream and download relative url to file schemas ([172c6252](https://github.com/lykmapipo/file/commit/172c6252d743aea28f547287782ec34206f43928))
*  implement file filter creator for a bucket ([5b72b1c2](https://github.com/lykmapipo/file/commit/5b72b1c2c74197dcdc66091c2c5e83dfc46363e5))
*  implement bucketInfoFor helper ([974e18f6](https://github.com/lykmapipo/file/commit/974e18f69bc0b4f486bafa11ea4ab6f5ec024b3d))
*  implement bucketFor to get gridfs bucket by name ([c947fc6b](https://github.com/lykmapipo/file/commit/c947fc6b516fcd4e078167f9c68856df1b720126))
*  allow File model switching based on request bucket ([c226f9cf](https://github.com/lykmapipo/file/commit/c226f9cf3ca0eeb9aca7ce46ba26ff9f038dde7f))
*  implement modelForBucket to obtain model for a give bucket ([bac68a63](https://github.com/lykmapipo/file/commit/bac68a630354cafe5353f2ff03b6c03a7861e805))
*  apply rest actions to simplify metadata http api ([8c02de92](https://github.com/lykmapipo/file/commit/8c02de920f21637eadc389345b9b44621bcb44f7))
*  implement file download get http handler ([ffcf8bc8](https://github.com/lykmapipo/file/commit/ffcf8bc8ae9d5c5ed976521c38a334f978b2bbec))
*  implement file chunks get http handler ([70e3a76b](https://github.com/lykmapipo/file/commit/70e3a76b27d3790449ed54bc6d1636af74abb526))
*  implement file put http handler ([f2c24cfe](https://github.com/lykmapipo/file/commit/f2c24cfe62af98b6c9051ed0a8d61d02c6452f80))
*  implement file patch http handler ([afabc791](https://github.com/lykmapipo/file/commit/afabc7917bdaa4e134bfadd7deadde583f48c2e5))
*  implement file delete http handler ([4e20ded9](https://github.com/lykmapipo/file/commit/4e20ded925690528da26a5e44d05c426f2218fe1))
*  implement get file details http handler ([1a663c34](https://github.com/lykmapipo/file/commit/1a663c3425511200f2851adf8bd373d27fff34c2))
*  implement initial http upload handler ([a8eb01a5](https://github.com/lykmapipo/file/commit/a8eb01a5ff8a70598edcd55d50ede0becff2fdc1))
*  implement createBuckets to expose common GridFS buckets ([2b0f02e7](https://github.com/lykmapipo/file/commit/2b0f02e7f6ee7316ca34d9c2056d3818c7f279e1))
*  refactor to ensure models on request ([62a0291e](https://github.com/lykmapipo/file/commit/62a0291ec7a10f09b1d895ba2ae9b0be4f740848))
*  implement Buckets and FileTypes definitions ([3fdbab6f](https://github.com/lykmapipo/file/commit/3fdbab6fbfeb7adf365640e67a4d0ffc73d16c1b))

##### Bug Fixes

*  implement fileFilter to allow multer to ignore other files ([55c2c7be](https://github.com/lykmapipo/file/commit/55c2c7beb044aeec608ad746fd2feb17470d61cb))
*  improve model switching base on bucket path param ([269128f9](https://github.com/lykmapipo/file/commit/269128f9a8d9f8ae90f4dc77ef5a776b360d0280))

##### Refactors

*  common exports ([164684db](https://github.com/lykmapipo/file/commit/164684db98c4645b647a575655741174c4c035c9))
*  use bucketInfoFor helper ([9cb18252](https://github.com/lykmapipo/file/commit/9cb18252aae5296b4c4fbe7fab488ec3d4a81d17))
*  allow storage switch based on bucket ([20bf7f1f](https://github.com/lykmapipo/file/commit/20bf7f1fe8539a8c2476628a1d4a19ee2e342af7))
*  rename modelForBucket to modelFor ([3f94d283](https://github.com/lykmapipo/file/commit/3f94d28327e18a205604da7875ed4e46b244abfe))
*  extract id from request params ([d3e816ca](https://github.com/lykmapipo/file/commit/d3e816ca05242ea8427ea3b9d28427723caefdeb))
*  improve package exports ([35919d25](https://github.com/lykmapipo/file/commit/35919d25cb6042b8d3af2de1c2c6f8039923a90b))
*  update router hanlders to use expess-rest-actions helpers ([9756881b](https://github.com/lykmapipo/file/commit/9756881b76cc903f26cb2f4fb361d9d936399d92))

##### Code Style Changes

*  improve model jsdocs ([eb00f87f](https://github.com/lykmapipo/file/commit/eb00f87f3436d40d5ea32aee2dd92edcc54d837e))
*  remove unused imports ([5b580042](https://github.com/lykmapipo/file/commit/5b5800421615d468928385511c63688baab267cf))
*  improve http api docs ([ca2f8b88](https://github.com/lykmapipo/file/commit/ca2f8b88520ede49f510164886ceaa5931407141))
*  improve jsdocs ([c987be5a](https://github.com/lykmapipo/file/commit/c987be5a838a72cc770e87da493b339c4674676f))

##### Tests

*  implelemt file schematype specs ([1fd4bfd3](https://github.com/lykmapipo/file/commit/1fd4bfd397485c0b8ffb8d96c4ecfec766a79f25))
*  implement file schema types specs ([f926e719](https://github.com/lykmapipo/file/commit/f926e7199d7270e0bc89d2cfd0fd2f74add1dea6))
*  refactor model specs file name ([4a2c1f81](https://github.com/lykmapipo/file/commit/4a2c1f81a19491e6557844b07f0179af63fc1b50))
*  implement videos buckekt http api spec ([0b14e22f](https://github.com/lykmapipo/file/commit/0b14e22f9ea02f73d29f14499ff36add283c6212))
*  implement images buckekt http api spec ([6d131f8a](https://github.com/lykmapipo/file/commit/6d131f8a2813a2f83dd4e0c31b0f2a57c701c0e9))
*  implement documents buckekt http api spec ([4aa9e915](https://github.com/lykmapipo/file/commit/4aa9e915c6ca1691b6268f397d386499c96ca602))
*  implement audios buckekt http api spec ([3f366840](https://github.com/lykmapipo/file/commit/3f36684097b70910b384e40ae5defc69b5a1f095))
*  fix file http spec to virtual timestamps ([00c62e64](https://github.com/lykmapipo/file/commit/00c62e6438ee886e119cd144fdbafd3e9a88543b))
*  refactor to usee express test helpers ([9936bd94](https://github.com/lykmapipo/file/commit/9936bd9461344a405b455f4459ca9f508fc5fc88))
*  add empty specs for file http api ([bf63d653](https://github.com/lykmapipo/file/commit/bf63d6535c19b96746bc90198ac52eb3ba650116))
*  ensure properties assertions on file http specs ([1377eaa2](https://github.com/lykmapipo/file/commit/1377eaa217a0c969d61cf579cad2c22e5da19dc6))
*  improve file http spec setup ([a359e0e3](https://github.com/lykmapipo/file/commit/a359e0e3b1bdea5525fb1266501c857c7eb435c1))
*  initialize http spec and dedupe dependencies ([b397a806](https://github.com/lykmapipo/file/commit/b397a806471a875bdae8a5762d30934bc455574d))
*  clear unused var from index spec ([5fa759d6](https://github.com/lykmapipo/file/commit/5fa759d61c38eb122eb4a1f873e180c0408106fd))
*  clear unused specs from index ([3d20e233](https://github.com/lykmapipo/file/commit/3d20e23365aaec8871ba2f7222b686668772956f))
*  implement write, read, unlink specs for Image and Video model ([528dd6ab](https://github.com/lykmapipo/file/commit/528dd6abdde30383e7e9781e6f77e163c7550784))
*  implement write, read, unlink specs for File model ([e2e71fc0](https://github.com/lykmapipo/file/commit/e2e71fc0e1bbcc41491611be55d5704b47242196))
*  implement write, read, unlink specs for Audio model ([045d8565](https://github.com/lykmapipo/file/commit/045d8565456c187b26ec56b2f2e504c1f03be2eb))
*  implement write, read, unlink specs for Document model ([6589d763](https://github.com/lykmapipo/file/commit/6589d763ca574932d83e09d6b4d47127f6c881e7))
*  implement File, Image, Audio, Video, Document write specs ([f8da5208](https://github.com/lykmapipo/file/commit/f8da5208e79d63b5f8aadfb0b28663e33b1ae26d))
*  add fixtures ([6f146f09](https://github.com/lykmapipo/file/commit/6f146f0913d0adbd6388d17c0130ecad7afe4a9a))
*  ensure createModels specs ([57d6d078](https://github.com/lykmapipo/file/commit/57d6d0789bd8e76818727561edab34585ae7830c))
*  flatten test directories ([8aefb258](https://github.com/lykmapipo/file/commit/8aefb25814608bc7416868998cf9e0d47d6f6f02))
*  ensure Buckets assertions ([011a218b](https://github.com/lykmapipo/file/commit/011a218bfb80980b786dbf1f67545be83bcdaff5))
*  ensure FileTypes schematypes assertions ([d6163c4d](https://github.com/lykmapipo/file/commit/d6163c4dac9fbb7592f4e11bc8d427f83a41e290))
