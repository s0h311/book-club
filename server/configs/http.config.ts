const cookie: string = `
regStatus=pre-register; session-id=141-5737708-5322611; session-id-time=2082787201l; lc-main=en_US; ubid-main=130-4905800-4570967; session-token=8uDItaw2bWm4rgfe/qQZHC/3+1utFJSv8bqh41HrXwo4+kuJB5bWlmmC09kJLZUAx0wQqE8vmuPcjn92CCnd9GgQNMfamxVB05O+FjVMdA6JA8L7XQnZ43Sru2NKTjJZQoom0/i1aOGBjkLlIFhVv/4eivl2q7PRkWTfAOrUeyTH87v97LlnDrt2EVKGS3XGwipSp9w1wOE+wS2mhhY3dPTlDLvGvWjrIWR85JQi7wIAesS8sLhcZBj4oe62pga0z8nk5O0JQLiX9MYI6HSR9bKjHi3vx0bl36EhNia/TX4yGSdU3T/HwaqDRuTEJBM8wFpC9ymH1f774/iumoN2pVhF7/5hgpgcK1nKl9CXn+L77Eut9F+8Fx3z2CiY5VHB; sid="rNLtn27ZRVki+TQ6iJf/xw==|xOD4b5O9uR9FgpuPh34/NCgWSzfahBMwWlSz0YiiLno="; x-main="dntcJz0Gq?PhJ@8QeoF4frCixv14keVyQRp6o?ttEuvMZdnAGm9n@yLEeybW2MV2"; at-main=Atza|IwEBIMGEMRLLixe9g3_iO-m5cMsYaUcju2iBL9oIcQ4PPggCpkyZg6idYIhU_aD7OFpbs-T1Ak5TZ7l1Kn3aiVAu9aTiyfPJxa_goYeBpmF5B7MqBp7iZEyJ6OySJwydW19oY4zgB6O4lwH6MgTVdVPUiL32hHFV3Kv8uURzm8SROXv9i4dJSgYvUd0xsyic_uIuhOea9SREzremPNAG2UED3cD7HlM3M--UeKcnbbH5o3UzAg; sess-at-main="8MNdHVEXYJC8MvC5WtXFb87t6HY83e+YWOSBPUY4gdE="; sst-main=Sst1|PQHcZmK_Drg5RsfFHlbtc97WCW9i0qxShRFQKBfvQWb5TNOFPM9-7PGvTPo4kJ_C-JIlhFa5pCpcqQ3AY4idJLGs3p5AWPZDWrHrDe7iEmoqv_64Cv0yqpYJG1mHaHXJoGSuSFWqqsdQP6RsSNBjp7avTEe3VufwBUDnsknlFMJMKd8SuByk5uJbPP8jjv7jJ5dzVp2i1gDShcHj-_3aJdNEHZrqDk0xwJTUx2Pg9DQss3i5ZizKAAsn-MmX_jBsu6h4XdIAbwu4LMdssvfva4MbyCF5XQLBlHyG8UJpinV1jUA; csm-hit=tb:X12K04W8X32097C92NR4+s-R52MGVZZ5ZD886E3C8VT|1703772274713&t:1703772274713&adb:adblk_yes; i18n-prefs=USD; sp-cdn="L5Z9:DE"; aws-ubid-main=506-0488275-6102125; aws_lang=de; aws-target-data=%7B%22support%22%3A%221%22%7D
  `

// { string: string | number }
export const headers = {
  Cookie: cookie,
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0',
}

/* export const libraryUrl: string = 'https://read.amazon.com/kindle-library/search'
export const highlightUrl = (asin: string): string =>
  `https://read.amazon.com/notebook?asin=${asin}&contentLimitState=&` */

export const libraryUrl: string = 'http://localhost:3000/api/fakeBook'
export const highlightUrl = (asin: string): string => `http://localhost:3000/api/fakeHighlight`
