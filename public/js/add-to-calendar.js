const atcbVersion = "1.13.2",
  isBrowser = Function(
    "try { return this===window; } catch(e) { return false; }"
  ),
  isiOS = isBrowser()
    ? Function(
        'if ((/iPad|iPhone|iPod/i.test(navigator.userAgent || navigator.vendor || window.opera) && !window.MSStream) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) { return true; } else { return false; }'
      )
    : Function("return false;"),
  isAndroid = isBrowser()
    ? Function(
        "if (/android/i.test(navigator.userAgent || navigator.vendor || window.opera) && !window.MSStream) { return true; } else { return false; }"
      )
    : Function("return false;"),
  isWebView = isBrowser()
    ? Function(
        "if (/(; ?wv|(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari))/i.test(navigator.userAgent || navigator.vendor)) { return true; } else { return false; }"
      )
    : Function("return false;"),
  isProblematicWebView = isBrowser()
    ? Function(
        "if (/(Instagram)/i.test(navigator.userAgent || navigator.vendor || window.opera)) { return true; } else { return false; }"
      )
    : Function("return false;");
let atcbDefaultTarget = "_blank";
isWebView() && (atcbDefaultTarget = "_system");
const atcbIcon = {
  trigger:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.88 122.88'><path d='M81.61 4.73c0-2.61 2.58-4.73 5.77-4.73s5.77 2.12 5.77 4.73v20.72c0 2.61-2.58 4.73-5.77 4.73s-5.77-2.12-5.77-4.73V4.73h0zm-3.65 76.03c1.83 0 3.32 1.49 3.32 3.32s-1.49 3.32-3.32 3.32l-12.95-.04-.04 12.93c0 1.83-1.49 3.32-3.32 3.32s-3.32-1.49-3.32-3.32l.04-12.94-12.93-.05c-1.83 0-3.32-1.49-3.32-3.32s1.49-3.32 3.32-3.32l12.94.04.04-12.93c0-1.83 1.49-3.32 3.32-3.32s3.32 1.49 3.32 3.32l-.04 12.95 12.94.04h0zM29.61 4.73c0-2.61 2.58-4.73 5.77-4.73s5.77 2.12 5.77 4.73v20.72c0 2.61-2.58 4.73-5.77 4.73s-5.77-2.12-5.77-4.73V4.73h0zM6.4 45.32h110.08V21.47c0-.8-.33-1.53-.86-2.07-.53-.53-1.26-.86-2.07-.86H103c-1.77 0-3.2-1.43-3.2-3.2s1.43-3.2 3.2-3.2h10.55c2.57 0 4.9 1.05 6.59 2.74s2.74 4.02 2.74 6.59v27.06 65.03c0 2.57-1.05 4.9-2.74 6.59s-4.02 2.74-6.59 2.74H9.33c-2.57 0-4.9-1.05-6.59-2.74-1.69-1.7-2.74-4.03-2.74-6.6V48.53 21.47c0-2.57 1.05-4.9 2.74-6.59s4.02-2.74 6.59-2.74H20.6c1.77 0 3.2 1.43 3.2 3.2s-1.43 3.2-3.2 3.2H9.33c-.8 0-1.53.33-2.07.86-.53.53-.86 1.26-.86 2.07v23.85h0zm110.08 6.41H6.4v61.82c0 .8.33 1.53.86 2.07.53.53 1.26.86 2.07.86h104.22c.8 0 1.53-.33 2.07-.86.53-.53.86-1.26.86-2.07V51.73h0zM50.43 18.54c-1.77 0-3.2-1.43-3.2-3.2s1.43-3.2 3.2-3.2h21.49c1.77 0 3.2 1.43 3.2 3.2s-1.43 3.2-3.2 3.2H50.43h0z'/></svg>",
  apple:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640' shape-rendering='geometricPrecision' image-rendering='optimizeQuality' fill-rule='evenodd'><path d='M494.782 340.02c-.803-81.025 66.084-119.907 69.072-121.832-37.595-54.993-96.167-62.552-117.037-63.402-49.843-5.032-97.242 29.362-122.565 29.362-25.253 0-64.277-28.607-105.604-27.85-54.32.803-104.4 31.594-132.403 80.245C29.81 334.457 71.81 479.58 126.816 558.976c26.87 38.882 58.914 82.56 100.997 81 40.512-1.594 55.843-26.244 104.848-26.244 48.993 0 62.753 26.245 105.64 25.406 43.606-.803 71.232-39.638 97.925-78.65 30.887-45.12 43.548-88.75 44.316-90.994-.969-.437-85.029-32.634-85.879-129.439l.118-.035zM414.23 102.178C436.553 75.095 451.636 37.5 447.514-.024c-32.162 1.311-71.163 21.437-94.253 48.485-20.729 24.012-38.836 62.28-33.993 99.036 35.918 2.8 72.591-18.248 94.926-45.272l.036-.047z'/></svg>",
  google:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.88 122.88'><path d='M93.78 29.1H29.1v64.68h64.68V29.1z' fill='#fff'/><path d='M93.78 122.88l29.1-29.1h-29.1v29.1z' fill='#f72a25'/><path d='M122.88 29.1h-29.1v64.68h29.1V29.1z' fill='#fbbc04'/><path d='M93.78 93.78H29.1v29.1h64.68v-29.1z' fill='#34a853'/><path d='M0 93.78v19.4c0 5.36 4.34 9.7 9.7 9.7h19.4v-29.1H0h0z' fill='#188038'/><path d='M122.88 29.1V9.7c0-5.36-4.34-9.7-9.7-9.7h-19.4v29.1h29.1 0z' fill='#1967d2'/><path d='M93.78 0H9.7C4.34 0 0 4.34 0 9.7v84.08h29.1V29.1h64.67V0h.01z' fill='#4285f4'/><path d='M42.37 79.27c-2.42-1.63-4.09-4.02-5-7.17l5.61-2.31c.51 1.94 1.4 3.44 2.67 4.51 1.26 1.07 2.8 1.59 4.59 1.59 1.84 0 3.41-.56 4.73-1.67 1.32-1.12 1.98-2.54 1.98-4.26 0-1.76-.7-3.2-2.09-4.32s-3.14-1.67-5.22-1.67H46.4v-5.55h2.91c1.79 0 3.31-.48 4.54-1.46 1.23-.97 1.84-2.3 1.84-3.99 0-1.5-.55-2.7-1.65-3.6s-2.49-1.35-4.18-1.35c-1.65 0-2.96.44-3.93 1.32s-1.7 2-2.12 3.24l-5.55-2.31c.74-2.09 2.09-3.93 4.07-5.52s4.51-2.39 7.58-2.39c2.27 0 4.32.44 6.13 1.32s3.23 2.1 4.26 3.65c1.03 1.56 1.54 3.31 1.54 5.25 0 1.98-.48 3.65-1.43 5.03-.95 1.37-2.13 2.43-3.52 3.16v.33c1.79.74 3.36 1.96 4.51 3.52 1.17 1.58 1.76 3.46 1.76 5.66s-.56 4.16-1.67 5.88c-1.12 1.72-2.66 3.08-4.62 4.07s-4.17 1.49-6.62 1.49c-2.84 0-5.46-.81-7.88-2.45h0 0zm34.46-27.84l-6.16 4.45-3.08-4.67 11.05-7.97h4.24v37.6h-6.05V51.43h0z' fill='#1a73e8'/></svg>",
  ical: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.88 122.88'><path d='M81.61 4.73c0-2.61 2.58-4.73 5.77-4.73s5.77 2.12 5.77 4.73v20.72c0 2.61-2.58 4.73-5.77 4.73s-5.77-2.12-5.77-4.73V4.73h0zm-15.5 99.08c-.34 0-.61-1.43-.61-3.2s.27-3.2.61-3.2H81.9c.34 0 .61 1.43.61 3.2s-.27 3.2-.61 3.2H66.11h0zM15.85 67.09c-.34 0-.61-1.43-.61-3.2s.27-3.2.61-3.2h15.79c.34 0 .61 1.43.61 3.2s-.27 3.2-.61 3.2H15.85h0zm25.13 0c-.34 0-.61-1.43-.61-3.2s.27-3.2.61-3.2h15.79c.34 0 .61 1.43.61 3.2s-.27 3.2-.61 3.2H40.98h0zm25.13 0c-.34 0-.61-1.43-.61-3.2s.27-3.2.61-3.2H81.9c.34 0 .61 1.43.61 3.2s-.27 3.2-.61 3.2H66.11h0zm25.14 0c-.34 0-.61-1.43-.61-3.2s.27-3.2.61-3.2h15.79c.34 0 .61 1.43.61 3.2s-.27 3.2-.61 3.2H91.25h0zm-75.4 18.36c-.34 0-.61-1.43-.61-3.2s.27-3.2.61-3.2h15.79c.34 0 .61 1.43.61 3.2s-.27 3.2-.61 3.2H15.85h0zm25.13 0c-.34 0-.61-1.43-.61-3.2s.27-3.2.61-3.2h15.79c.34 0 .61 1.43.61 3.2s-.27 3.2-.61 3.2H40.98h0zm25.13 0c-.34 0-.61-1.43-.61-3.2s.27-3.2.61-3.2H81.9c.34 0 .61 1.43.61 3.2s-.27 3.2-.61 3.2H66.11h0zm25.14 0c-.34 0-.61-1.43-.61-3.2s.27-3.2.61-3.2h15.79c.34 0 .61 1.43.61 3.2s-.27 3.2-.61 3.2H91.25h0zm-75.4 18.36c-.34 0-.61-1.43-.61-3.2s.27-3.2.61-3.2h15.79c.34 0 .61 1.43.61 3.2s-.27 3.2-.61 3.2H15.85h0zm25.13 0c-.34 0-.61-1.43-.61-3.2s.27-3.2.61-3.2h15.79c.34 0 .61 1.43.61 3.2s-.27 3.2-.61 3.2H40.98h0zM29.61 4.73c0-2.61 2.58-4.73 5.77-4.73s5.77 2.12 5.77 4.73v20.72c0 2.61-2.58 4.73-5.77 4.73s-5.77-2.12-5.77-4.73V4.73h0zM6.4 45.32h110.07V21.47c0-.8-.33-1.53-.86-2.07-.53-.53-1.26-.86-2.07-.86H103c-1.77 0-3.2-1.43-3.2-3.2s1.43-3.2 3.2-3.2h10.55c2.57 0 4.9 1.05 6.59 2.74s2.74 4.02 2.74 6.59v27.06 65.03c0 2.57-1.05 4.9-2.74 6.59s-4.02 2.74-6.59 2.74H9.33c-2.57 0-4.9-1.05-6.59-2.74-1.69-1.7-2.74-4.03-2.74-6.6V48.52 21.47c0-2.57 1.05-4.9 2.74-6.59s4.02-2.74 6.59-2.74H20.6c1.77 0 3.2 1.43 3.2 3.2s-1.43 3.2-3.2 3.2H9.33c-.8 0-1.53.33-2.07.86-.53.53-.86 1.26-.86 2.07v23.85h0zm110.08 6.41H6.4v61.82c0 .8.33 1.53.86 2.07.53.53 1.26.86 2.07.86h104.22c.8 0 1.53-.33 2.07-.86.53-.53.86-1.26.86-2.07V51.73h0zM50.43 18.54c-1.77 0-3.2-1.43-3.2-3.2s1.43-3.2 3.2-3.2h21.49c1.77 0 3.2 1.43 3.2 3.2s-1.43 3.2-3.2 3.2H50.43h0z'/></svg>",
  msteams:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2228.833 2073.333'><g fill='#5059c9'><path d='M1554.637 777.5h575.713c54.391 0 98.483 44.092 98.483 98.483v524.398c0 199.901-162.051 361.952-361.952 361.952h0-1.711c-199.901.028-361.975-162-362.004-361.901v-.052-571.409c.001-28.427 23.045-51.471 51.471-51.471h0z'/><circle cx='1943.75' cy='440.583' r='233.25'/></g><g fill='#7b83eb'><circle cx='1218.083' cy='336.917' r='336.917'/><path d='M1667.323 777.5H717.01c-53.743 1.33-96.257 45.931-95.01 99.676v598.105c-7.505 322.519 247.657 590.16 570.167 598.053 322.51-7.893 577.671-275.534 570.167-598.053V877.176c1.245-53.745-41.268-98.346-95.011-99.676z'/></g><path opacity='.1' d='M1244 777.5v838.145c-.258 38.435-23.549 72.964-59.09 87.598-11.316 4.787-23.478 7.254-35.765 7.257H667.613c-6.738-17.105-12.958-34.21-18.142-51.833-18.144-59.477-27.402-121.307-27.472-183.49V877.02c-1.246-53.659 41.198-98.19 94.855-99.52H1244z'/><path opacity='.2' d='M1192.167 777.5v889.978a91.84 91.84 0 0 1-7.257 35.765c-14.634 35.541-49.163 58.833-87.598 59.09H691.975c-8.812-17.105-17.105-34.21-24.362-51.833s-12.958-34.21-18.142-51.833a631.28 631.28 0 0 1-27.472-183.49V877.02c-1.246-53.659 41.198-98.19 94.855-99.52h475.313z'/><path opacity='.2' d='M1192.167 777.5v786.312c-.395 52.223-42.632 94.46-94.855 94.855h-447.84A631.28 631.28 0 0 1 622 1475.177V877.02c-1.246-53.659 41.198-98.19 94.855-99.52h475.312z'/><path opacity='.2' d='M1140.333 777.5v786.312c-.395 52.223-42.632 94.46-94.855 94.855H649.472A631.28 631.28 0 0 1 622 1475.177V877.02c-1.246-53.659 41.198-98.19 94.855-99.52h423.478z'/><path opacity='.1' d='M1244 509.522v163.275c-8.812.518-17.105 1.037-25.917 1.037s-17.105-.518-25.917-1.037c-17.496-1.161-34.848-3.937-51.833-8.293a336.92 336.92 0 0 1-233.25-198.003 288.02 288.02 0 0 1-16.587-51.833h258.648c52.305.198 94.657 42.549 94.856 94.854z'/><use xlink:href='#C' opacity='.2'/><use xlink:href='#C' opacity='.2'/><path opacity='.2' d='M1140.333 561.355v103.148A336.92 336.92 0 0 1 907.083 466.5h138.395c52.305.199 94.656 42.551 94.855 94.855z'/><linearGradient id='A' gradientUnits='userSpaceOnUse' x1='198.099' y1='392.261' x2='942.234' y2='1681.073'><stop offset='0' stop-color='#5a62c3'/><stop offset='.5' stop-color='#4d55bd'/><stop offset='1' stop-color='#3940ab'/></linearGradient><path fill='url(#A)' d='M95.01 466.5h950.312c52.473 0 95.01 42.538 95.01 95.01v950.312c0 52.473-42.538 95.01-95.01 95.01H95.01c-52.473 0-95.01-42.538-95.01-95.01V561.51c0-52.472 42.538-95.01 95.01-95.01z'/><path fill='#fff' d='M820.211,828.193H630.241v517.297H509.211V828.193H320.123V727.844h500.088V828.193z'/><defs ><path id='C' d='M1192.167 561.355v111.442c-17.496-1.161-34.848-3.937-51.833-8.293a336.92 336.92 0 0 1-233.25-198.003h190.228c52.304.198 94.656 42.55 94.855 94.854z'/></defs></svg>",
  ms365:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 278050 333334' shape-rendering='geometricPrecision' image-rendering='optimizeQuality' fill-rule='evenodd'><path fill='#ea3e23' d='M278050 305556l-29-16V28627L178807 0 448 66971l-448 87 22 200227 60865-23821V80555l117920-28193-17 239519L122 267285l178668 65976v73l99231-27462v-316z'/></svg>",
  outlookcom:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='-0.129793726981 0 33.251996719421 32' width='2500' height='2397'><path d='M28.596 2H11.404A1.404 1.404 0 0 0 10 3.404V5l9.69 3L30 5V3.404A1.404 1.404 0 0 0 28.596 2z' fill='#0364b8'/><path d='M31.65 17.405A11.341 11.341 0 0 0 32 16a.666.666 0 0 0-.333-.576l-.013-.008-.004-.002L20.812 9.24a1.499 1.499 0 0 0-1.479-.083 1.49 1.49 0 0 0-.145.082L8.35 15.415l-.004.002-.012.007A.666.666 0 0 0 8 16a11.344 11.344 0 0 0 .35 1.405l11.492 8.405z' fill='#0a2767'/><path d='M24 5h-7l-2.021 3L17 11l7 6h6v-6z' fill='#28a8ea'/><path d='M10 5h7v6h-7z' fill='#0078d4'/><path d='M24 5h6v6h-6z' fill='#50d9ff'/><path d='M24 17l-7-6h-7v6l7 6 10.832 1.768z' fill='#0364b8'/><path d='M17 11h7v6h-7z' fill='#0078d4'/><path d='M10 17h7v6h-7z' fill='#064a8c'/><path d='M24 17h6v6h-6z' fill='#0078d4'/><path d='M20.19 25.218l-11.793-8.6.495-.87 10.909 6.212a.528.528 0 0 0 .42-.012l10.933-6.23.496.869z' fill='#0a2767' opacity='.5'/><path d='M31.667 16.577l-.014.008-.003.002-10.838 6.174a1.497 1.497 0 0 1-1.46.091l3.774 5.061 8.254 1.797v.004A1.498 1.498 0 0 0 32 28.5V16a.666.666 0 0 1-.333.577z' fill='#1490df'/><path d='M32 28.5v-.738l-9.983-5.688-1.205.687a1.497 1.497 0 0 1-1.46.091l3.774 5.061 8.254 1.797v.004A1.498 1.498 0 0 0 32 28.5z' opacity='.05'/><path d='M31.95 28.883L21.007 22.65l-.195.11a1.497 1.497 0 0 1-1.46.092l3.774 5.061 8.254 1.797v.004a1.501 1.501 0 0 0 .57-.83z' opacity='.1'/><path d='M8.35 16.59v-.01h-.01l-.03-.02A.65.65 0 0 1 8 16v12.5A1.498 1.498 0 0 0 9.5 30h21a1.503 1.503 0 0 0 .37-.05.637.637 0 0 0 .18-.06.142.142 0 0 0 .06-.02 1.048 1.048 0 0 0 .23-.13c.02-.01.03-.01.04-.03z' fill='#28a8ea'/><path d='M18 24.667V8.333A1.337 1.337 0 0 0 16.667 7H10.03v7.456l-1.68.958-.005.002-.012.007A.666.666 0 0 0 8 16v.005V16v10h8.667A1.337 1.337 0 0 0 18 24.667z' opacity='.1'/><path d='M17 25.667V9.333A1.337 1.337 0 0 0 15.667 8H10.03v6.456l-1.68.958-.005.002-.012.007A.666.666 0 0 0 8 16v.005V16v11h7.667A1.337 1.337 0 0 0 17 25.667z' opacity='.2'/><path d='M17 23.667V9.333A1.337 1.337 0 0 0 15.667 8H10.03v6.456l-1.68.958-.005.002-.012.007A.666.666 0 0 0 8 16v.005V16v9h7.667A1.337 1.337 0 0 0 17 23.667z' opacity='.2'/><path d='M16 23.667V9.333A1.337 1.337 0 0 0 14.667 8H10.03v6.456l-1.68.958-.005.002-.012.007A.666.666 0 0 0 8 16v.005V16v9h6.667A1.337 1.337 0 0 0 16 23.667z' opacity='.2'/><path d='M1.333 8h13.334A1.333 1.333 0 0 1 16 9.333v13.334A1.333 1.333 0 0 1 14.667 24H1.333A1.333 1.333 0 0 1 0 22.667V9.333A1.333 1.333 0 0 1 1.333 8z' fill='#0078d4'/><path d='M3.867 13.468a4.181 4.181 0 0 1 1.642-1.814A4.965 4.965 0 0 1 8.119 11a4.617 4.617 0 0 1 2.413.62 4.14 4.14 0 0 1 1.598 1.733 5.597 5.597 0 0 1 .56 2.55 5.901 5.901 0 0 1-.577 2.666 4.239 4.239 0 0 1-1.645 1.794A4.8 4.8 0 0 1 7.963 21a4.729 4.729 0 0 1-2.468-.627 4.204 4.204 0 0 1-1.618-1.736 5.459 5.459 0 0 1-.567-2.519 6.055 6.055 0 0 1 .557-2.65zm1.75 4.258a2.716 2.716 0 0 0 .923 1.194 2.411 2.411 0 0 0 1.443.435 2.533 2.533 0 0 0 1.541-.449 2.603 2.603 0 0 0 .897-1.197 4.626 4.626 0 0 0 .286-1.665 5.063 5.063 0 0 0-.27-1.686 2.669 2.669 0 0 0-.866-1.24 2.387 2.387 0 0 0-1.527-.473 2.493 2.493 0 0 0-1.477.439 2.741 2.741 0 0 0-.944 1.203 4.776 4.776 0 0 0-.007 3.44z' fill='#fff'/></svg>",
  yahoo:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3386.34 3010.5' shape-rendering='geometricPrecision' image-rendering='optimizeQuality' fill-rule='evenodd'><path d='M0 732.88h645.84l376.07 962.1 380.96-962.1h628.76l-946.8 2277.62H451.98l259.19-603.53L.02 732.88zm2763.84 768.75h-704.26L2684.65 0l701.69.03-622.5 1501.6zm-519.78 143.72c216.09 0 391.25 175.17 391.25 391.22 0 216.06-175.16 391.23-391.25 391.23-216.06 0-391.19-175.17-391.19-391.23 0-216.05 175.16-391.22 391.19-391.22z' fill='#5f01d1' fill-rule='nonzero'/></svg>",
  close:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.878 122.88'><path d='M1.426 8.313a4.87 4.87 0 0 1 0-6.886 4.87 4.87 0 0 1 6.886 0l53.127 53.127 53.127-53.127a4.87 4.87 0 0 1 6.887 0 4.87 4.87 0 0 1 0 6.886L68.324 61.439l53.128 53.128a4.87 4.87 0 0 1-6.887 6.886L61.438 68.326 8.312 121.453a4.87 4.87 0 0 1-6.886 0 4.87 4.87 0 0 1 0-6.886l53.127-53.128L1.426 8.313h0z'/></svg>",
  browser:
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.88 113.6'><path d='M71.89 100.56q-3.86 3.82-8.37 7.63l3.74-.62a49.38 49.38 0 0 0 7.08-2l.43.64 1 1.27h0 0a16.4 16.4 0 0 0 2.13 2 55.29 55.29 0 0 1-9.73 2.92 58.73 58.73 0 0 1-22.83 0 53.48 53.48 0 0 1-10.6-3.27.26.26 0 0 1-.14-.07 62.1 62.1 0 0 1-9.6-5.17A54.41 54.41 0 0 1 16.6 97a52.69 52.69 0 0 1-6.89-8.38A59.79 59.79 0 0 1 4.46 79a55.79 55.79 0 0 1-3.34-10.78 58.73 58.73 0 0 1 0-22.83 52.86 52.86 0 0 1 3.28-10.6.33.33 0 0 1 .06-.14A60.34 60.34 0 0 1 9.71 25a54 54 0 0 1 6.89-8.39 52.19 52.19 0 0 1 8.4-6.9 59.7 59.7 0 0 1 9.67-5.25 54.52 54.52 0 0 1 10.72-3.34 58.73 58.73 0 0 1 22.83 0 53.89 53.89 0 0 1 10.6 3.27.28.28 0 0 1 .13.07 61.75 61.75 0 0 1 9.68 5.25A54.41 54.41 0 0 1 97 16.59a52.27 52.27 0 0 1 6.89 8.41 58.19 58.19 0 0 1 5.25 9.67 54.52 54.52 0 0 1 3.34 10.74l.12.6-5.42-1.53a47 47 0 0 0-2.6-7.83 54.22 54.22 0 0 0-2.87-5.76H85.08a65.47 65.47 0 0 1 4.2 8.49l-6.16-1.66a65.73 65.73 0 0 0-3.86-6.83h-20v3.41l-.61.22a13.48 13.48 0 0 0-4.36 2.68v-6.33h-20q-7.67 11.91-8.62 23.44h25.57q1 2.47 2.09 5H25.62c.31 7.87 3 15.67 7.88 23.44h20.82V61.56l5 11v10.17h4.76l2.29 5h-7.08v17.51a123.84 123.84 0 0 0 10.53-9.65q1.05 2.49 2.07 5zM114.75 98a4.64 4.64 0 0 1-1.17.79h-.08a4.14 4.14 0 0 1-4.36-.6l-11.6-9.84-4 9.77a12.93 12.93 0 0 1-1.19 2.25 9.1 9.1 0 0 1-1.51 1.76 4.78 4.78 0 0 1-7.5-.82 9.28 9.28 0 0 1-.92-1.63c-6.9-17.49-16.26-34.9-23.26-52.4A3.11 3.11 0 0 1 62.65 43c16.77 3.1 38.5 10.19 55.55 14.71 5.3 1.4 6.16 6.07 2.25 9.69a12.21 12.21 0 0 1-2 1.52c-3 1.7-6 3.67-9 5.47l11.55 9.9a4.25 4.25 0 0 1 1 1.26v.08a4.28 4.28 0 0 1 .39 1.47h0a4.26 4.26 0 0 1-.16 1.54 4.39 4.39 0 0 1-.72 1.39 94.55 94.55 0 0 1-6.76 7.97zm-3-3.84l5.59-6.56c-2.46-2.11-13-10.29-14.09-12.26a2.41 2.41 0 0 1 .83-3.25c3.66-2 8.36-4.86 11.83-7.17a8.38 8.38 0 0 0 1.22-.89 4.42 4.42 0 0 0 .75-.87l.16-.3-.31-.18a3.92 3.92 0 0 0-.76-.26L65 48.6l21.83 49.14a4.8 4.8 0 0 0 .38.7l.22.29.28-.2a4.51 4.51 0 0 0 .73-.89 7.51 7.51 0 0 0 .68-1.33c1.63-4 3.49-9.47 5.4-13.17l.23-.32a2.4 2.4 0 0 1 3.37-.27l13.64 11.57zm-61.62 14.03a105.56 105.56 0 0 1-19.26-20.48H15.16a51.5 51.5 0 0 0 12.61 12 52.81 52.81 0 0 0 8.89 4.8s.07 0 .11.07a49.13 49.13 0 0 0 9.64 3 65.13 65.13 0 0 0 3.75.62zM11.89 82.73H27.7a50.6 50.6 0 0 1-7-23.44H5a55.75 55.75 0 0 0 1 7.94A48.27 48.27 0 0 0 9 77a54.16 54.16 0 0 0 2.86 5.76zM5 54.31h15.75a54.38 54.38 0 0 1 7.77-23.44H11.89A54.16 54.16 0 0 0 9 36.63s0 .07-.07.1a49.91 49.91 0 0 0-3 9.65 51.46 51.46 0 0 0-1 7.93zM15.13 25.9h16.59A117.72 117.72 0 0 1 50.46 5.35c-1.39.17-2.76.37-4.08.65a48.36 48.36 0 0 0-9.75 3 55.24 55.24 0 0 0-8.89 4.8 51.5 51.5 0 0 0-12.61 12h0zm48-20.55A114.63 114.63 0 0 1 81.88 25.9h16.6a48.63 48.63 0 0 0-5-5.76 49.81 49.81 0 0 0-7.63-6.27A53.27 53.27 0 0 0 77 9.06s-.06 0-.1-.06a49.15 49.15 0 0 0-9.64-3c-1.36-.27-2.73-.48-4.09-.65h0zm-3.84 3.24V25.9h16.49A115.68 115.68 0 0 0 59.29 8.59zm-5 96.63V87.71H37a105.67 105.67 0 0 0 17.35 17.51zm0-79.32V8.59A116.3 116.3 0 0 0 37.82 25.9z'/></svg>",
};
function atcb_init() {
  console.log(
    "add-to-calendar button initialized (version " + atcbVersion + ")"
  ),
    console.log(
      "See https://github.com/add2cal/add-to-calendar-button for details"
    );
  let e = document.querySelectorAll(".atcb");
  if (0 < e.length) {
    var t = document.querySelectorAll(".atcb-initialized");
    for (let a = 0; a < e.length; a++)
      if (!e[parseInt(a)].classList.contains("atcb-initialized")) {
        let _ = JSON.parse(
          atcb_seure_content(
            e[parseInt(a)].innerHTML.replace(/(\r\n|\n|\r)/g, ""),
            !1
          )
        );
        atcb_check_required((_ = atcb_patch_config(_))) &&
          atcb_validate((_ = atcb_decorate_data(_))) &&
          ((null != _.identifier && "" != _.identifier) ||
            (_.identifier = "atcb-btn-" + (a + t.length + 1)),
          atcb_generate(e[parseInt(a)], _));
      }
  }
}
function atcb_patch_config(e) {
  null != e.event &&
    (Object.keys(e.event).forEach((t) => {
      "@" !== t.charAt(0) && (e["" + t] = e.event["" + t]);
    }),
    delete e.event);
  let t = {
    title: "name",
    dateStart: "startDate",
    dateEnd: "endDate",
    timeStart: "startTime",
    timeEnd: "endTime",
  };
  return (
    Object.keys(t).forEach((a) => {
      null == e[t["" + a]] && null != e["" + a] && (e[t["" + a]] = e["" + a]);
    }),
    e
  );
}
function atcb_decorate_data(e) {
  for (let t = 0; t < e.options.length; t++) {
    let a = e.options["" + t].split("|");
    e.options["" + t] = a[0]
      .toLowerCase()
      .replace("microsoft", "ms")
      .replace(".", "");
  }
  if (
    (((e = atcb_date_cleanup(e)).startDate = atcb_date_calculation(
      e.startDate
    )),
    (e.endDate = atcb_date_calculation(e.endDate)),
    "modal" === e.listStyle && (e.trigger = "click"),
    null == e.lightMode || "" == e.lightMode)
  )
    e.lightMode = "light";
  else if (null != e.lightMode && "" != e.lightMode) {
    var _ = window.matchMedia("(prefers-color-scheme: dark)");
    switch (e.lightMode) {
      case "system":
        _.matches ? (e.lightMode = "dark") : (e.lightMode = "light");
        break;
      case "bodyScheme":
      case "dark":
        break;
      default:
        e.lightMode = "light";
    }
  }
  if (
    ((null != e.language && "" != e.language) || (e.language = "en"),
    null != e.recurrence &&
      "" != e.recurrence &&
      (e.recurrence = e.recurrence.replace(/\s+/g, "")),
    !e.description || e.descriptionHtmlFree)
  )
    return e;
  let l = Object.assign({}, e);
  return (
    (l.descriptionHtmlFree = atcb_rewrite_html_elements(l.description, !0)),
    (l.description = atcb_rewrite_html_elements(l.description)),
    l
  );
}
function atcb_check_required(e) {
  return null == e.options || e.options.length < 1
    ? (console.error(
        "add-to-calendar button generation failed: no options set"
      ),
      !1)
    : ["name", "startDate"].every(function (t) {
        return (
          (null != e["" + t] && "" != e["" + t]) ||
          (console.error(
            "add-to-calendar button generation failed: required setting missing [" +
              t +
              "]"
          ),
          !1)
        );
      });
}
function atcb_date_cleanup(e) {
  return (
    (null != e.endDate && "" != e.endDate) ||
      null == e.startDate ||
      (e.endDate = e.startDate),
    ["start", "end"].forEach(function (t) {
      var a;
      if (
        (null != e[t + "Date"] &&
          ((e[t + "Date"] = e[t + "Date"]
            .replace(/\.\d{3}/, "")
            .replace("Z", "")),
          null != (a = e[t + "Date"].split("T"))[1] &&
            ((e[t + "Date"] = a[0]), (e[t + "Time"] = a[1]))),
        null != e[t + "Time"] && 8 === e[t + "Time"].length)
      ) {
        let _ = e[t + "Time"];
        e[t + "Time"] = _.substring(0, _.length - 3);
      }
    }),
    e
  );
}
function atcb_date_calculation(e) {
  let t = new Date();
  var a = t.getUTCMonth() + 1 + "-" + t.getUTCDate() + "-" + t.getUTCFullYear();
  let _ = (e = e.replace(/today/gi, a)).split("+");
  a = _[0].split("-");
  let l = new Date(a[0], a[1] - 1, a[2]);
  return (
    a[0].length < 4 && (l = new Date(a[2], a[0] - 1, a[1])),
    null != _[1] && 0 < _[1] && l.setDate(l.getDate() + parseInt(_[1])),
    l.getFullYear() +
      "-" +
      (l.getMonth() + 1 < 10 ? "0" : "") +
      (l.getMonth() + 1) +
      "-" +
      (10 > l.getDate() ? "0" : "") +
      l.getDate()
  );
}
function atcb_validate(e) {
  if (
    (null != e.identifier &&
      "" != e.identifier &&
      (/^[\w-]+$/.test(e.identifier) ||
        ((e.identifier = ""),
        console.error(
          "add-to-calendar button generation: identifier invalid - using auto numbers instead"
        ))),
    !(
      null == e.icsFile ||
      "" == e.icsFile ||
      (atcb_secure_url(e.icsFile, !1) && /\.ics$/.test(e.icsFile))
    ))
  )
    return (
      console.error(
        "add-to-calendar button generation failed: explicit ics file path not valid"
      ),
      !1
    );
  let t = [
      "apple",
      "google",
      "ical",
      "ms365",
      "outlookcom",
      "msteams",
      "yahoo",
    ],
    a = ["apple", "google", "ical"];
  if (
    !e.options.every(function (e) {
      return (
        (e = e.split("|")),
        !!t.includes(e[0]) ||
          (console.error(
            "add-to-calendar button generation failed: invalid option [" +
              e[0] +
              "]"
          ),
          !1)
      );
    })
  )
    return !1;
  if ((null != e.recurrence) & ("" != e.recurrence)) {
    let _ = !1;
    if (
      (e.options.forEach(function (e) {
        (e = e.split("|")), a.includes(e[0]) && (_ = !0);
      }),
      !_)
    )
      return (
        console.error(
          "add-to-calendar button generation failed: no supported valid option for recurring events"
        ),
        !1
      );
  }
  let l = ["startDate", "endDate"],
    $ = l;
  return (
    !!l.every(function (t) {
      if (10 !== e["" + t].length)
        return (
          console.error(
            "add-to-calendar button generation failed: date misspelled [-> YYYY-MM-DD]"
          ),
          !1
        );
      var a = e["" + t].split("-");
      return a.length < 3 || 3 < a.length
        ? (console.error(
            "add-to-calendar button generation failed: date misspelled [" +
              t +
              ": " +
              e["" + t] +
              "]"
          ),
          !1)
        : (($["" + t] = new Date(a[0], a[1] - 1, a[2])), !0);
    }) &&
    !!["startTime", "endTime"].every(function (t) {
      if (null != e["" + t]) {
        if (5 !== e["" + t].length)
          return (
            console.error(
              "add-to-calendar button generation failed: time misspelled [-> HH:MM]"
            ),
            !1
          );
        var a = e["" + t].split(":");
        if (a.length < 2 || 2 < a.length)
          return (
            console.error(
              "add-to-calendar button generation failed: time misspelled [" +
                t +
                ": " +
                e["" + t] +
                "]"
            ),
            !1
          );
        if (23 < a[0])
          return (
            console.error(
              "add-to-calendar button generation failed: time misspelled - hours number too high [" +
                t +
                ": " +
                a[0] +
                "]"
            ),
            !1
          );
        if (59 < a[1])
          return (
            console.error(
              "add-to-calendar button generation failed: time misspelled - minutes number too high [" +
                t +
                ": " +
                a[1] +
                "]"
            ),
            !1
          );
        "startTime" == t &&
          ($.startDate = new Date(
            $.startDate.getTime() + 36e5 * a[0] + 6e4 * a[1]
          )),
          "endTime" == t &&
            ($.endDate = new Date(
              $.endDate.getTime() + 36e5 * a[0] + 6e4 * a[1]
            ));
      }
      return !0;
    }) &&
    ((null != e.startTime && null == e.endTime) ||
    (null == e.startTime && null != e.endTime)
      ? (console.error(
          "add-to-calendar button generation failed: if you set a starting time, you also need to define an end time"
        ),
        !1)
      : $.endDate < $.startDate
      ? (console.error(
          "add-to-calendar button generation failed: end date before start date"
        ),
        !1)
      : !(
          null != e.recurrence &&
          "" != e.recurrence &&
          !/^[\w=;:*+-/\\]+$/.test(e.recurrence)
        ) ||
        (console.error(
          "add-to-calendar button generation failed: RRULE data misspelled"
        ),
        !1))
  );
}
function atcb_generate_label(e, t, a, _ = !1, l = "", $ = !1) {
  if (
    null == e.recurrence ||
    "" == e.recurrence ||
    ("msteams" != a && "ms365" != a && "outlookcom" != a && "yahoo" != a)
  ) {
    var n = atcb_translate_hook("Add to Calendar", e.language, e);
    switch (($ && "" == l && (l = n), a)) {
      case "trigger":
      default:
        "click" === e.trigger
          ? t.addEventListener(
              "click",
              atcb_debounce_leading(() => atcb_toggle(e, t, !1, !0))
            )
          : (t.addEventListener(
              "touchstart",
              atcb_debounce_leading(() => atcb_toggle(e, t, !1, !0)),
              { passive: !0 }
            ),
            t.addEventListener(
              "mouseenter",
              atcb_debounce_leading(() => atcb_open(e, t, !1, !0))
            )),
          t.setAttribute("id", e.identifier),
          (l = l || n);
        break;
      case "apple":
        t.addEventListener(
          "click",
          atcb_debounce(() => {
            $ ? t.blur() : atcb_close(), atcb_generate_ical(e);
          })
        ),
          t.setAttribute("id", e.identifier + "-apple"),
          (l = l || "Apple");
        break;
      case "google":
        t.addEventListener(
          "click",
          atcb_debounce(() => {
            $ ? t.blur() : atcb_close(), atcb_generate_google(e);
          })
        ),
          t.setAttribute("id", e.identifier + "-google"),
          (l = l || "Google");
        break;
      case "ical":
        t.addEventListener(
          "click",
          atcb_debounce(() => {
            $ ? t.blur() : atcb_close(), atcb_generate_ical(e);
          })
        ),
          t.setAttribute("id", e.identifier + "-ical"),
          (l = l || atcb_translate_hook("iCal File", e.language, e));
        break;
      case "msteams":
        t.addEventListener(
          "click",
          atcb_debounce(() => {
            $ ? t.blur() : atcb_close(), atcb_generate_teams(e);
          })
        ),
          t.setAttribute("id", e.identifier + "-msteams"),
          (l = l || "Microsoft Teams");
        break;
      case "ms365":
        t.addEventListener(
          "click",
          atcb_debounce(() => {
            $ ? t.blur() : atcb_close(), atcb_generate_microsoft(e, "365");
          })
        ),
          t.setAttribute("id", e.identifier + "-ms365"),
          (l = l || "Microsoft 365");
        break;
      case "outlookcom":
        t.addEventListener(
          "click",
          atcb_debounce(() => {
            $ ? t.blur() : atcb_close(), atcb_generate_microsoft(e, "outlook");
          })
        ),
          t.setAttribute("id", e.identifier + "-outlook"),
          (l = l || "Outlook.com");
        break;
      case "yahoo":
        t.addEventListener(
          "click",
          atcb_debounce(() => {
            $ ? t.blur() : atcb_close(), atcb_generate_yahoo(e);
          })
        ),
          t.setAttribute("id", e.identifier + "-yahoo"),
          (l = l || "Yahoo");
        break;
      case "close":
        t.addEventListener(
          "click",
          atcb_debounce(() => {
            $ ? t.blur() : atcb_close();
          })
        ),
          t.addEventListener(
            "focus",
            atcb_debounce(() => atcb_close(!1))
          ),
          t.setAttribute("id", e.identifier + "-close"),
          (l = atcb_translate_hook("Close", e.language, e));
    }
    if (
      ($ && t.setAttribute("id", e.identifier),
      $ || "trigger" !== a
        ? t.addEventListener(
            "keydown",
            atcb_debounce_leading((e) => {
              "Enter" == e.key && (e.preventDefault(), t.click());
            })
          )
        : t.addEventListener(
            "keydown",
            atcb_debounce_leading((a) => {
              "Enter" == a.key &&
                (a.preventDefault(), atcb_toggle(e, t, !0, !0));
            })
          ),
      _)
    ) {
      let i = document.createElement("span");
      i.classList.add("atcb-icon"),
        (i.innerHTML = atcbIcon["" + a]),
        t.appendChild(i);
    }
    let c = document.createElement("span");
    c.classList.add("atcb-text"), (c.textContent = l), t.appendChild(c);
  } else t.remove();
}
function atcb_generate(e, t) {
  if (((e.textContent = ""), t.name && t.location && t.startDate)) {
    let a = document.createElement("script");
    a.setAttribute("type", "application/ld+json"),
      (a.textContent =
        '{ "event": { "@context":"https://schema.org", "@type":"Event", '),
      (a.textContent += '"name":"' + t.name + '", '),
      t.descriptionHtmlFree &&
        (a.textContent += '"description":"' + t.descriptionHtmlFree + '", ');
    var _ = atcb_generate_time(t, "delimiters", "general", !0);
    (a.textContent += '"startDate":"' + _.start + '", '),
      (a.textContent += '"endDate":"' + _.end + '", '),
      t.location.startsWith("http")
        ? ((a.textContent +=
            '"eventAttendanceMode":"https://schema.org/OnlineEventAttendanceMode", '),
          (a.textContent +=
            '"location": { "@type":"VirtualLocation", "url":"' +
            t.location +
            '" } '))
        : (a.textContent += '"location":"' + t.location + '" '),
      (a.textContent += "} }"),
      e.appendChild(a);
  }
  let l = document.createElement("div"),
    $ =
      (l.classList.add("atcb-button-wrapper"),
      l.classList.add("atcb-" + t.lightMode),
      e.appendChild(l),
      document.createElement("button"));
  if (
    ($.classList.add("atcb-button"),
    $.setAttribute("type", "button"),
    l.appendChild($),
    1 === t.options.length)
  )
    (_ = t.options[0].split("|")),
      atcb_generate_label(t, $, _[0], !0, t.label, !0);
  else {
    atcb_generate_label(t, $, "trigger", !0, t.label);
    let n = document.createElement("div");
    n.classList.add("atcb-dropdown-anchor"), l.appendChild(n);
  }
  e.classList.remove("atcb"),
    e.classList.add("atcb-initialized"),
    t.inline ? (e.style.display = "inline-block") : (e.style.display = "block"),
    console.log('add-to-calendar button "' + t.identifier + '" created');
}
function atcb_generate_dropdown_list(e) {
  let t = document.createElement("div");
  if (
    (t.classList.add("atcb-list"),
    t.classList.add("atcb-" + e.lightMode),
    e.options.forEach(function (a) {
      a = a.split("|");
      let _ = document.createElement("div");
      _.classList.add("atcb-list-item"),
        (_.tabIndex = 0),
        t.appendChild(_),
        atcb_generate_label(e, _, a[0], !0, a[1]);
    }),
    "modal" === e.listStyle)
  ) {
    let a = document.createElement("div");
    a.classList.add("atcb-list-item", "atcb-list-item-close"),
      (a.tabIndex = 0),
      t.appendChild(a),
      atcb_generate_label(e, a, "close", !0);
  }
  return t;
}
function atcb_generate_bg_overlay(e = "dropdown", t = "", a = !0) {
  let _ = document.createElement("div");
  _.setAttribute("id", "atcb-bgoverlay"),
    "modal" !== e && a && _.classList.add("atcb-animate-bg"),
    a || _.classList.add("atcb-no-bg"),
    (_.tabIndex = 0),
    _.addEventListener(
      "click",
      atcb_debounce((e) => {
        e.target === e.currentTarget && atcb_close(!0);
      })
    );
  let l = !1;
  return (
    _.addEventListener(
      "touchstart",
      atcb_debounce_leading(() => (l = !1)),
      { passive: !0 }
    ),
    _.addEventListener(
      "touchmove",
      atcb_debounce_leading(() => (l = !0)),
      { passive: !0 }
    ),
    _.addEventListener(
      "touchend",
      atcb_debounce((e) => {
        !1 === l && e.target === e.currentTarget && atcb_close(!0);
      }),
      { passive: !0 }
    ),
    _.addEventListener(
      "focus",
      atcb_debounce_leading((e) => {
        e.target === e.currentTarget && atcb_close();
      })
    ),
    "click" !== t
      ? _.addEventListener(
          "mousemove",
          atcb_debounce_leading((e) => {
            e.target === e.currentTarget && atcb_close(!0);
          })
        )
      : _.classList.add("atcb-click"),
    _
  );
}
function atcb_toggle(e, t, a = !1, _ = !1) {
  t.classList.contains("atcb-active") ||
  document.querySelector(".atcb-active-modal")
    ? atcb_close()
    : atcb_open(e, t, a, _);
}
function atcb_open(e, t, a = !1, _ = !1) {
  if (
    !document.querySelector(".atcb-list") &&
    !document.querySelector(".atcb-modal")
  ) {
    let l = atcb_generate_dropdown_list(e),
      $ = document.createElement("div"),
      n =
        ($.classList.add("atcb-list-wrapper"),
        t
          ? (t.classList.add("atcb-active"),
            "modal" === e.listStyle
              ? (t.classList.add("atcb-modal-style"),
                l.classList.add("atcb-modal"))
              : ($.appendChild(l), $.classList.add("atcb-dropdown")),
            _ && l.classList.add("atcb-generated-button"))
          : l.classList.add("atcb-modal"),
        atcb_generate_bg_overlay(e.listStyle, e.trigger, e.background));
    l.classList.add("fade-in");
    let i = l.querySelectorAll(".atcb-list-item");
    i.forEach((e, t) => {
      let a = e.querySelector(".atcb-icon"),
        _ = e.querySelector(".atcb-text");
      (a.style.opacity = 0), (_.style.opacity = 0);
      let l = 100 * t;
      (a.style.animation = `slideUpAnimation ease 0.5s ${l}ms forwards`),
        (_.style.animation = `slideUpTextAnimation ease 0.5s ${
          l + 50
        }ms forwards`);
    }),
      "modal" === e.listStyle
        ? (document.body.appendChild(n),
          n.appendChild(l),
          document.body.classList.add("atcb-modal-no-scroll"))
        : (document.body.appendChild($),
          $.appendChild(l),
          atcb_position_list(t, $),
          document.body.appendChild(n)),
      atcb_set_fullsize(n),
      a ? l.firstChild.focus() : (l.firstChild.focus(), l.firstChild.blur());
  }
}
function atcb_close(e = !1) {
  if (!e) {
    let t = document.querySelector(".atcb-active, .atcb-active-modal");
    t && t.focus();
  }
  Array.from(document.querySelectorAll(".atcb-active")).forEach((e) => {
    e.classList.remove("atcb-active");
  }),
    Array.from(document.querySelectorAll(".atcb-active-modal")).forEach((e) => {
      e.classList.remove("atcb-active-modal");
    }),
    document.body.classList.remove("atcb-modal-no-scroll"),
    Array.from(document.querySelectorAll(".atcb-list-wrapper"))
      .concat(Array.from(document.querySelectorAll(".atcb-list")))
      .concat(Array.from(document.querySelectorAll(".atcb-info-modal")))
      .concat(Array.from(document.querySelectorAll("#atcb-bgoverlay")))
      .forEach((e) => e.remove());
}
function atcb_action(e, t, a = !0) {
  if (!atcb_check_required((e = atcb_seure_content(e))))
    throw Error("data missing; see logs");
  if (!atcb_validate((e = atcb_decorate_data(e))))
    throw Error("Invalid data; see logs");
  t
    ? (e.identifier = t.id)
    : ((e.identifier = "atcb-btn-custom"),
      (e.listStyle = "modal"),
      (e.trigger = "click")),
    atcb_open(e, t, a);
}
function atcb_generate_google(e) {
  let t = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  var a = atcb_generate_time(e, "clean", "google");
  (t += "&dates=" + a.start + "%2F" + a.end),
    null != e.name &&
      "" != e.name &&
      (t += "&text=" + encodeURIComponent(e.name));
  let _ = "";
  null != e.description && "" != e.description && (_ = e.description),
    null != e.location &&
      "" != e.location &&
      ((t += "&location=" + encodeURIComponent(e.location)),
      isiOS() &&
        ("" != _ && (_ += "<br><br>"), (_ += "&#128205;: " + e.location))),
    "" != _ && (t += "&details=" + encodeURIComponent(_)),
    null != e.recurrence &&
      "" != e.recurrence &&
      (t += "&recur=" + encodeURIComponent(e.recurrence)),
    atcb_secure_url(t) && window.open(t, atcbDefaultTarget).focus();
}
function atcb_generate_yahoo(e) {
  let t = "https://calendar.yahoo.com/?v=60";
  var a = atcb_generate_time(e, "clean");
  (t += "&st=" + a.start + "&et=" + a.end),
    a.allday && (t += "&dur=allday"),
    null != e.name &&
      "" != e.name &&
      (t += "&title=" + encodeURIComponent(e.name)),
    null != e.location &&
      "" != e.location &&
      (t += "&in_loc=" + encodeURIComponent(e.location)),
    null != e.descriptionHtmlFree &&
      "" != e.descriptionHtmlFree &&
      (t += "&desc=" + encodeURIComponent(e.descriptionHtmlFree)),
    atcb_secure_url(t) && window.open(t, atcbDefaultTarget).focus();
}
function atcb_generate_microsoft(e, t = "365") {
  let a = "https://";
  (a += "outlook" == t ? "outlook.live.com" : "outlook.office.com"),
    (a +=
      "/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent"),
    (a +=
      "&startdt=" +
      (t = atcb_generate_time(e, "delimiters", "microsoft")).start +
      "&enddt=" +
      t.end),
    t.allday && (a += "&allday=true"),
    null != e.name &&
      "" != e.name &&
      (a += "&subject=" + encodeURIComponent(e.name)),
    null != e.location &&
      "" != e.location &&
      (a += "&location=" + encodeURIComponent(e.location)),
    null != e.description &&
      "" != e.description &&
      (a +=
        "&body=" + encodeURIComponent(e.description.replace(/\n/g, "<br>"))),
    atcb_secure_url(a) && window.open(a, atcbDefaultTarget).focus();
}
function atcb_generate_teams(e) {
  let t = "https://teams.microsoft.com/l/meeting/new?";
  var a = atcb_generate_time(e, "delimiters", "microsoft");
  t += "&startTime=" + a.start + "&endTime=" + a.end;
  let _ = "";
  null != e.name &&
    "" != e.name &&
    (t += "&subject=" + encodeURIComponent(e.name)),
    null != e.location &&
      "" != e.location &&
      ((t += "&location=" + (_ = encodeURIComponent(e.location))),
      (_ += " // ")),
    null != e.descriptionHtmlFree &&
      "" != e.descriptionHtmlFree &&
      (t += "&content=" + _ + encodeURIComponent(e.descriptionHtmlFree)),
    atcb_secure_url(t) && window.open(t, atcbDefaultTarget).focus();
}
function atcb_generate_ical(e) {
  if (
    null == e.icsFile ||
    "" == e.icsFile ||
    !atcb_secure_url(e.icsFile) ||
    !e.icsFile.startsWith("https://") ||
    (isiOS() && isWebView())
  ) {
    let t = new Date();
    t = t.toISOString();
    var a = atcb_generate_time(e, "clean", "ical");
    let _ = "";
    a.allday && (_ = ";VALUE=DATE");
    let l = ["BEGIN:VCALENDAR", "VERSION:2.0"];
    l.push(
      "PRODID:-// github.com/add2cal/add-to-calendar-button // atcb v" +
        atcbVersion +
        " //EN"
    ),
      l.push("CALSCALE:GREGORIAN"),
      l.push("BEGIN:VEVENT"),
      l.push("UID:" + t + "@add-to-calendar-button"),
      l.push(
        "DTSTAMP:" + a.start,
        "DTSTART" + _ + ":" + a.start,
        "DTEND" + _ + ":" + a.end,
        "SUMMARY:" + e.name.replace(/.{65}/g, "$&\r\n ")
      ),
      null != e.descriptionHtmlFree &&
        "" != e.descriptionHtmlFree &&
        l.push(
          "DESCRIPTION:" +
            e.descriptionHtmlFree
              .replace(/\n/g, "\\n")
              .replace(/.{60}/g, "$&\r\n ")
        ),
      null != e.description &&
        "" != e.description &&
        l.push(
          'X-ALT-DESC;FMTTYPE=text/html:\r\n <!DOCTYPE HTML PUBLIC ""-//W3C//DTD HTML 3.2//EN"">\r\n <HTML><BODY>\r\n ' +
            e.description.replace(/\n/g, "<br>").replace(/.{60}/g, "$&\r\n ") +
            "\r\n </BODY></HTML>"
        ),
      null != e.location &&
        "" != e.location &&
        l.push("LOCATION:" + e.location),
      null != e.recurrence && "" != e.recurrence && l.push(e.recurrence),
      l.push(
        "STATUS:CONFIRMED",
        "LAST-MODIFIED:" +
          (t = t.replace(/\.\d{3}/g, "").replace(/[^a-z\d]/gi, "")),
        "SEQUENCE:0",
        "END:VEVENT",
        "END:VCALENDAR"
      );
    let $ =
      "data:text/calendar;charset=utf-8," + encodeURIComponent(l.join("\r\n"));
    if (
      ((a = e.iCalFileName || "event-to-save-in-my-calendar"),
      null != e.icsFile &&
        "" != e.icsFile &&
        atcb_secure_url(e.icsFile) &&
        e.icsFile.startsWith("https://") &&
        ($ = e.icsFile),
      isWebView() && (isiOS() || (isAndroid() && isProblematicWebView())))
    ) {
      let n = document.createElement("input");
      document.body.appendChild(n);
      var i,
        c,
        r = n.contentEditable,
        o = n.readOnly;
      (n.value = $),
        (n.contentEditable = !0),
        (n.readOnly = !1),
        isiOS()
          ? ((i = document.createRange()).selectNodeContents(n),
            (c = window.getSelection()).removeAllRanges(),
            c.addRange(i),
            n.setSelectionRange(0, 999999))
          : (navigator.clipboard.writeText($), n.select()),
        (n.contentEditable = r),
        (n.readOnly = o),
        document.execCommand("copy"),
        n.remove(),
        atcb_create_modal(
          e,
          "browser",
          atcb_translate_hook("WebView iCal", e.language, e),
          atcb_translate_hook("WebView info description", e.language, e)
        );
    } else
      try {
        if (window.ActiveXObject) {
          if (window.ActiveXObject && document.execCommand) {
            let s = window.open($, atcbDefaultTarget);
            s.document.close(),
              s.document.execCommand("SaveAs", !0, a || $),
              s.close();
          }
        } else {
          let d = document.createElement("a");
          (d.href = $), (d.target = atcbDefaultTarget), (d.download = a);
          var u = new MouseEvent("click", {
            view: window,
            button: 0,
            bubbles: !0,
            cancelable: !1,
          });
          d.dispatchEvent(u),
            (window.URL || window.webkitURL).revokeObjectURL(d.href);
        }
      } catch (b) {
        console.error(b);
      }
  } else window.open(e.icsFile, atcbDefaultTarget);
}
function atcb_generate_time(e, t = "delimiters", a = "general", _ = !1) {
  var l = e.startDate.split("-"),
    $ = e.endDate.split("-");
  let n = "",
    i = "",
    c = !1;
  if (null != e.startTime && null != e.endTime) {
    if (null != e.timeZoneOffset && "" != e.timeZoneOffset)
      (n = new Date(
        l[0] +
          "-" +
          l[1] +
          "-" +
          l[2] +
          "T" +
          e.startTime +
          ":00.000" +
          e.timeZoneOffset
      )),
        (i = new Date(
          $[0] +
            "-" +
            $[1] +
            "-" +
            $[2] +
            "T" +
            e.endTime +
            ":00.000" +
            e.timeZoneOffset
        ));
    else if (
      ((n = new Date(
        l[0] + "-" + l[1] + "-" + l[2] + "T" + e.startTime + ":00.000+00:00"
      )),
      (i = new Date(
        $[0] + "-" + $[1] + "-" + $[2] + "T" + e.endTime + ":00.000+00:00"
      )),
      null != e.timeZone && "" != e.timeZone)
    ) {
      let r = new Date(n.toLocaleString("en-US", { timeZone: "UTC" })),
        o =
          ("currentBrowser" == e.timeZone &&
            (e.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone),
          new Date(n.toLocaleString("en-US", { timeZone: e.timeZone })));
      var s = r.getTime() - o.getTime();
      n.setTime(n.getTime() + s), i.setTime(i.getTime() + s);
    }
    if (
      ((n = n.toISOString().replace(".000", "")),
      (i = i.toISOString().replace(".000", "")),
      "clean" == t &&
        ((n = n.replace(/-/g, "").replace(/:/g, "")),
        (i = i.replace(/-/g, "").replace(/:/g, ""))),
      _)
    ) {
      let d = "",
        u = "";
      null != e.timeZoneOffset && "" != e.timeZoneOffset
        ? ((d = e.timeZoneOffset), (u = e.timeZoneOffset))
        : null != e.timeZone &&
          "" != e.timeZone &&
          (u = ((d = new Date(n.toLocaleString("sv", { timeZone: e.timeZone }))
            .toString()
            .match(/GMT(.{5})/g)[0]
            .replace(/GMT(.{3})(.{2})/g, "$1:$2")),
          new Date(i.toLocaleString("sv", { timeZone: e.timeZone })))
            .toString()
            .match(/GMT(.{5})/g)[0]
            .replace(/GMT(.{3})(.{2})/g, "$1:$2")),
        (n = n.slice(0, -1) + d),
        (i = i.slice(0, -1) + u);
    }
  } else {
    c = !0;
    let b = (n = new Date(Date.UTC(l[0], l[1] - 1, l[2])))
        .toISOString()
        .replace(/T(.+)Z/g, ""),
      h =
        ((i = new Date(Date.UTC($[0], $[1] - 1, $[2]))),
        ("google" != a && "microsoft" != a && "ical" != a) ||
          i.setDate(i.getDate() + 1),
        i.toISOString().replace(/T(.+)Z/g, ""));
    "clean" == t && ((b = b.replace(/-/g, "")), (h = h.replace(/-/g, ""))),
      (n = b),
      (i = h);
  }
  return { start: n, end: i, allday: c };
}
function atcb_seure_content(e, t = !0) {
  let a;
  return (
    (a = (a = t ? JSON.stringify(e) : e).replace(/(<(?!br)([^>]+)>)/gi, "")),
    t ? JSON.parse(a) : a
  );
}
function atcb_secure_url(e, t = !0) {
  return (
    !e.match(
      /((\.\.\/)|(\.\.\\)|(%2e%2e%2f)|(%252e%252e%252f)|(%2e%2e\/)|(%252e%252e\/)|(\.\.%2f)|(\.\.%252f)|(%2e%2e%5c)|(%252e%252e%255c)|(%2e%2e\\)|(%252e%252e\\)|(\.\.%5c)|(\.\.%255c)|(\.\.%c0%af)|(\.\.%25c0%25af)|(\.\.%c1%9c)|(\.\.%25c1%259c))/gi
    ) ||
    (t &&
      console.error(
        "Seems like the generated URL includes at least one security issue and got blocked. Please check the calendar button parameters!"
      ),
    !1)
  );
}
function atcb_rewrite_html_elements(e, t = !1) {
  return (
    (e = e.replace(/<br\s*\/?>/gi, "\n")),
    (e = t
      ? e.replace(
          /\[(|\/)(url|br|hr|p|b|strong|u|i|em|li|ul|ol|h\d)\]|((\|.*)\[\/url\])/gi,
          ""
        )
      : (e = e.replace(
          /\[(\/|)(br|hr|p|b|strong|u|i|em|li|ul|ol|h\d)\]/gi,
          "<$1$2>"
        )).replace(
          /\[url\]([\w&$+.,:;=~!*'?@^%#|\s\-()/]*)\[\/url\]/gi,
          function (e, t) {
            let a =
              '<a href="' +
              (t = t.split("|"))[0] +
              '" target="' +
              atcbDefaultTarget +
              '" rel="noopener">';
            return (
              1 < t.length && "" != t[1] ? (a += t[1]) : (a += t[0]), a + "</a>"
            );
          }
        ))
  );
}
function atcb_create_modal(e, t = "", a, _, l) {
  let $ = atcb_generate_bg_overlay("modal", "click"),
    n = document.createElement("div"),
    i =
      (n.classList.add("atcb-modal", "atcb-info-modal"),
      (n.tabIndex = 0),
      $.appendChild(n),
      document.body.appendChild($),
      document.body.classList.add("atcb-modal-no-scroll"),
      document.getElementById(e.identifier)),
    c =
      (null != i && i.classList.add("atcb-active-modal"),
      document.createElement("div")),
    r =
      (c.classList.add("atcb-modal-box"),
      c.classList.add("atcb-" + e.lightMode),
      n.appendChild(c),
      atcb_set_fullsize($),
      document.createElement("div")),
    o =
      (r.classList.add("atcb-modal-close"),
      (r.innerHTML = atcbIcon.close),
      c.appendChild(r),
      r.addEventListener(
        "click",
        atcb_debounce(() => atcb_close())
      ),
      r.addEventListener(
        "keydown",
        atcb_debounce_leading((e) => {
          "Enter" == e.key && (e.preventDefault(), atcb_close());
        })
      ),
      (null != l && 0 != l.length) || ((r.tabIndex = 0), r.focus()),
      document.createElement("div"));
  if ((o.classList.add("atcb-modal-headline"), c.appendChild(o), "" != t)) {
    let s = document.createElement("span");
    s.classList.add("atcb-modal-headline-icon"),
      (s.innerHTML = atcbIcon["" + t]),
      o.appendChild(s);
  }
  (t = document.createTextNode(a)), o.appendChild(t);
  let d = document.createElement("div");
  if (
    (d.classList.add("atcb-modal-content"),
    (d.innerHTML = _),
    c.appendChild(d),
    null != l && 0 < l.length)
  ) {
    let u = document.createElement("div");
    u.classList.add("atcb-modal-buttons"),
      c.appendChild(u),
      l.forEach((t, a) => {
        let _;
        null != t.href && "" != t.href
          ? ((_ = document.createElement("a")).setAttribute(
              "target",
              atcbDefaultTarget
            ),
            _.setAttribute("href", t.href),
            _.setAttribute("rel", "noopener"))
          : (_ = document.createElement("button")).setAttribute(
              "type",
              "button"
            ),
          _.classList.add("atcb-modal-btn"),
          t.primary && _.classList.add("atcb-modal-btn-primary"),
          (null != t.label && "" != t.label) ||
            (t.label = atcb_translate_hook("Click me", e.language, e)),
          (_.textContent = t.label),
          u.appendChild(_),
          0 == a && _.focus(),
          "close" !== t.type
            ? (_.addEventListener(
                "click",
                atcb_debounce(() => atcb_close())
              ),
              _.addEventListener(
                "keydown",
                atcb_debounce((e) => {
                  "Enter" == e.key && atcb_close();
                })
              ))
            : (_.addEventListener(
                "click",
                atcb_debounce(() => atcb_close())
              ),
              _.addEventListener(
                "keydown",
                atcb_debounce_leading((e) => {
                  "Enter" == e.key && (e.preventDefault(), atcb_close());
                })
              ));
      });
  }
}
function atcb_position_list(e, t) {
  let a = !1;
  null !== e.nextElementSibling &&
    e.nextElementSibling.classList.contains("atcb-dropdown-anchor") &&
    ((e = e.nextSibling), (a = !0));
  var e = e.getBoundingClientRect(),
    _ = t.getBoundingClientRect();
  !0 === a
    ? ((t.style.width = e.width + "px"),
      (t.style.top = e.top + window.scrollY + "px"),
      (t.style.left = e.left + "px"))
    : ((t.style.width = e.width + 10 + "px"),
      (t.style.top =
        e.top + e.height / 2 - _.height / 2 + window.scrollY + "px"),
      (t.style.left = e.left - 5 + "px"));
}
function atcb_set_fullsize(e) {
  (e.style.width = window.innerWidth + "px"),
    (e.style.height = window.innerHeight + 100 + "px");
}
function atcb_debounce(e, t = 200) {
  let a;
  return (..._) => {
    clearTimeout(a),
      (a = setTimeout(() => {
        e.apply(this, _);
      }, t));
  };
}
function atcb_debounce_leading(e, t = 200) {
  let a;
  return (..._) => {
    a || e.apply(this, _),
      clearTimeout(a),
      (a = setTimeout(() => {
        a = void 0;
      }, t));
  };
}
function atcb_throttle(e, t = 10) {
  let a,
    _ = null,
    l = 0,
    $ = (...t) => {
      (l = Date.now()), (_ = null), (a = e.apply(this, t));
    };
  return (...n) => {
    var i = Date.now(),
      c = t - (i - l);
    return (
      c <= 0 || t < c
        ? (_ && (clearTimeout(_), (_ = null)), (l = i), (a = e.apply(this, n)))
        : (_ = _ || setTimeout($, c)),
      a
    );
  };
}
function atcb_translate_hook(e, t, a) {
  var _ = e.replace(/\s+/g, "").toLowerCase();
  return null != a.customLabels &&
    null != a.customLabels["" + _] &&
    "" != a.customLabels["" + _]
    ? atcb_rewrite_html_elements(a.customLabels["" + _])
    : atcb_translate(e, t);
}
function atcb_translate(e, t) {
  switch (t) {
    case "en":
    default:
      switch (e) {
        case "Add to Calendar":
          return "Add to Calendar";
        case "iCal File":
          return "iCal File";
        case "Close":
          return "Close";
        case "Close Selection":
          return "Close Selection";
        case "Click me":
          return "Click me";
        case "WebView iCal":
          return "Open your browser";
        case "WebView info description":
          return "Unfortunately, in-app browsers have problems with the way we generate the calendar file.<br>We automatically put a magical URL into your phone's clipboard.<br><ol><li><strong>Open any other browser</strong> on your phone, ...</li><li><strong>Paste</strong> the clipboard content and go.";
      }
      break;
    case "de":
      switch (e) {
        case "Add to Calendar":
          return "Im Kalender speichern";
        case "iCal File":
          return "iCal-Datei";
        case "Close":
          return "Schlie\xdfen";
        case "Close Selection":
          return "Auswahl schlie\xdfen";
        case "Click me":
          return "Klick mich";
        case "WebView iCal":
          return "\xd6ffne deinen Browser";
        case "WebView info description":
          return "Leider haben In-App-Browser Probleme mit der Art, wie wir Kalender-Dateien erzeugen.<br>Wir haben automatisch eine magische URL in die Zwischenablage deines Smartphones kopiert.<br><ol><li><strong>\xd6ffne einen anderen Browser</strong> auf deinem Smartphone, ...</li><li>Nutze die <strong>Einf\xfcgen</strong>-Funktion, um fortzufahren.";
      }
  }
  return e;
}
isBrowser() &&
  (document.addEventListener(
    "keydown",
    atcb_debounce_leading((e) => {
      "Escape" === e.key && atcb_close();
    })
  ),
  window.addEventListener(
    "resize",
    atcb_throttle(() => {
      var e = document.getElementById("atcb-bgoverlay"),
        e =
          (null != e && atcb_set_fullsize(e),
          document.querySelector(".atcb-active")),
        t = document.querySelector(".atcb-dropdown");
      null != e && null != t && atcb_position_list(e, t);
    })
  )),
  isBrowser() &&
    ("loading" !== document.readyState
      ? atcb_init()
      : document.addEventListener("DOMContentLoaded", atcb_init, !1)),
  (window.atcb_action = atcb_action);
