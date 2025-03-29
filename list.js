let $menu;
let $menuButton;
let validityText;
let usageText;
let htmlClass = $('html').attr('class');
let isVisitor = getCookie('visitor');
let FAQ;
let siteNotice;
let backApiUrl;
let enableSiteShop;
let fkAddress;
let originUrl = window.location.origin;
let enableExpirationReminder;
let enableNoLogin;
let enableBackNode;
let showUserUsage;
let enableShowRemaining;
let enableNoSelectCar;

function loadExternalScript(url, callback) {
  let script = document.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  script.onload = callback;
  script.onerror = () => console.error(`加载失败: ${url}`);
  document.head.appendChild(script);
}
loadExternalScript('/jquery.min.js', () => {
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    '/app/libs/layui/css/layui.css';
  document.head.appendChild(link);
  loadExternalScript(
    '/app/libs/layui/layui.js',
    () => {
      initLayUI();
    }
  );
  loadExternalScript(
    '/app/libs/dom-to-image_nofonts.js',
    function () {
      loadExternalScript(
        '/app/libs/FileSaver.min.js',
        function () {
        }
      );
      loadExternalScript(
        '/app/libs/mhtmlToWord.js',
        function () {
        }
      );
    }
  );
});
function isMobile () {
  const userAgent = navigator.userAgent.toLowerCase();
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(
    userAgent
  );
};
function showAnnouncement(announcement) {
  const savedAnnouncement = localStorage.getItem('lastAnnouncement');
  if (announcement && savedAnnouncement !== announcement) {
    // 保存新的公告到 localStorage
    const isMobileVal = isMobile();
      width = isMobileVal
        ? $(window).width()
        : 800 || Math.min($(window).width(), 1024);
      height = isMobileVal
        ? $(window).height()
        : 600 || Math.min($(window).height(), 800);
      layer.open({
        type: 1,
        title: ['系统通知', 'font-size: 18px;'],
        shadeClose: true,
        shade: 0.2,
        maxmin: true,
        btn: ['知道了'],
        scrollbar: false,
        offset: 'auto',
        area: [`${width}px`, `${height}px`],
        content: announcement,
        yes: function (index) { 
          localStorage.setItem('lastAnnouncement', announcement);
          layer.close(index); // 关闭窗口
        }
      });
  }
}
function fetchAnnouncement() {
  fetch('/api/notice/getLatestNotice', { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data) { 
        const announcement = data?.data?.content;
        showAnnouncement(announcement);
      }
    })
    .catch((err) => {
      console.error('Error fetching the latest announcement:', err);
    });
}
const setLoading = (element) => {
  const loading = layer.msg(element, {
    icon: 16,
    shade: 0.01,
  });
  return loading;
};
const getMenuItemHtml = (text, iconName, onClick) => {
  return `<a style="flex:1;" class="flex gap-2 rounded p-2.5 text-sm cursor-pointer focus:ring-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onclick="${onClick};">
                  <i class="layui-icon ${iconName} layui-font-20"></i>
                  ${text}
              </a>`;
};
function getCookie(name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}
function export2Image() {
  const loadIndex = setLoading('开始将对话导出图片,请稍后...');
  if (
    !document.getElementsByClassName('flex flex-col text-sm md:pb-9').length
  ) {
    layer.msg('未找到聊天记录, 无法导出图片, 请先选择一个聊天记录');
    return;
  }
  var node = document.getElementsByClassName(
    'flex flex-col text-sm md:pb-9'
  )[0];
  var scale = 2;
  domtoimage
    .toBlob(node, {
      bgcolor:
        document.documentElement.style.colorScheme === 'dark'
          ? '#212121'
          : 'white',
      width: node.scrollWidth * scale,
      height: node.scrollHeight * scale,
      style: {
        transform: 'scale(2)',
        'transform-origin': 'top left',
        width: 'undefinedpx',
        height: 'undefinedpx',
      },
      filter: function (node) {
        if (
          node.tagName === 'IMG' &&
          node.src &&
          !node.src.startsWith(window.location.origin)
        ) {
          return false;
        }
        return true;
      },
      cacheBust: false,
    })
    .then(function (blob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${getCurrentTitle() || '聊天记录'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      layer.close(loadIndex);
    })
    .catch(function (error) {
      layer.msg('生成图片时出错');
      console.error('生成图片时出错', error);
      layer.close(loadIndex);
    });
}
function getCurrentTitle() {
  let title = document.getElementsByClassName(
    'bg-token-sidebar-surface-secondary'
  )[0]?.innerText;
  if (title) {
    return title;
  } else {
    return null;
  }
}
function addDeliver() {
  let element = document.getElementsByClassName('markdown');
  Array.from(element).forEach((element) => {
    element.insertAdjacentHTML(
      'afterend',
      `<div class="dom-to-docx"><br><br>&nbsp;&nbsp;<br><br></div>`
    );
  });
}
function deleteDeliver() {
  let element = document.getElementsByClassName('dom-to-docx');
  Array.from(element).forEach((element) => {
    element.remove();
  });
}
function export2File() {
  if (
    !document.getElementsByClassName('flex flex-col text-sm md:pb-9').length
  ) {
    layer.msg('未找到聊天记录, 无法导出文档, 请先选择一个聊天记录');
    return;
  }
  let title = getCurrentTitle();
  if (!title) {
    title = '导出文档';
  }
  addDeliver();
  exportWord({
    selector: '.markdown',
    filename: title,
  });
  deleteDeliver();
}
function isLogin() {
  if (isVisitor == 'true' || !isVisitor) {
    layer.msg('您还未登录,暂时无法使用该功能');
    return false;
  }
  return true;
}

function showMenu() {
  if (isVisitor == 'true' || !isVisitor) {
    return false;
  }
  return true;
}


function banGptAccount(carid) {
  console.log('禁用账号', carid);
  fetch(`/api/session/updateGptStatus?carId=${carid}`, { method: 'GET' })
    .then((response) => {
      console.log('禁用账号结果', response);
    })
    .catch((error) => {
      console.error('禁用账号失败', error);
    });
}

(function () {
    const originalFetch = window.fetch;
    let retryCount = 0;
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 100; // 100毫秒延迟

    window.fetch = async function (url, options) {
        if(typeof url == "object") {
            return originalFetch(url, options);
        }
        if (url.includes('/backend-api/conversation')) {
            try {
                const response = await originalFetch(url, options);
                
                // 重置重试计数
                if (response.ok) {
                    retryCount = 0;
                }

                // 处理非SSE响应
                if (!response.headers.get('content-type')?.includes('text/event-stream')) {
                    const clone = response.clone();
                    const data = await clone.json();
                    
                    // 处理非200响应
                    if (response.status === 500 && enableNoSelectCar === "true") {
                        console.log('对话请求响应失败，准备重试', response);
                        
                        // 如果还没到最大重试次数，进行重试
                        if (retryCount < MAX_RETRIES) {
                            retryCount++;
                            console.log('重试次数', retryCount);
                            
                            // 延迟重试
                            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                            
                            // 重新发起请求
                            return window.fetch(url, options);
                        }
                        
                        // 达到最大重试次数后自动选车
                        if (retryCount >= MAX_RETRIES) {
                            layer.confirm('当前账号对话异常，您希望:', {
                                btn: ['新建会话', '换车继续'],
                                title: '选择操作'
                            }, function() {
                                // 新建会话
                                createNewConversation();
                            }, function() {
                                // 换车继续
                                layer.msg('正在为您自动切换可用账号');
                                changeConversationCar();
                            });
                        }
                    }
                }
                return response;
            } catch (error) {
                console.error('请求出错:', error);
                return originalFetch(url, options);
            }
        }
        
        if (url===`${originUrl}/backend-api/me`) {
            try {
                const response = await originalFetch(url, options);
                console.log("账号状态:", response.status);
                
                if (response.status === 401) {
                    layer.msg("当前账号异常，请回到首页或者点击自动选车");
                    banGptAccount(getCookie('carid'));
                }
                return response;
            } catch (error) {
                console.error('请求出错:', error);
            }
        }
        
        return originalFetch(url, options);
    };
})();
// 添加新的函数
function changeConversationCar() {
  console.log("changeConversationCar");
  fetch("/backend-api/change_conversation_car")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.reload();
    })
    .catch(error => {
      console.error('切换会话车失败:', error);
      layer.msg('切换会话车失败，请稍后重试');
    });
}
function createNewConversation() {
  console.log("createNewConversation");
  window.location.href = "/";
}

function getUserId () { 
  const user = localStorage.getItem('user');
      let userId;

      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          userId = parsedUser.id;
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      }
  return userId;
}
function backApi() {
  if (backApiUrl) {
    // 校验用户权限
    const userId = getUserId();
    const token = localStorage.getItem('accessToken');
    fetch(
      `/api/user/checkAccess?userId=${encodeURIComponent(userId)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
      .then((data) => {
          console.log('校验结果', data);
          if (data.data === true) {
            window.open(backApiUrl);
          } else {
            layer.msg("您没有权限访问该功能");
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      layer.msg('管理员还未配置用站点');
    }
}
function setSessionCookie(name, value) {
  // 计算30天后的时间
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  // 设置cookie，包含过期时间
  document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
}
function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
function logout() {
  deleteCookie('gfsessionid');
  setSessionCookie('visitor', true);
  localStorage.removeItem('accessToken');
  window.location.href = originUrl;
}

function autoSelectClaude() {
  if (isLogin()) {
    const loadIndex = setLoading('正在跳转到claude,请稍后...');
    const username = getCookie('username');
    fetch(
      `/api/claude/getClaudeLoginUrl?username=${encodeURIComponent(username)}`
    )
      .then((element) => {
        if (!element.ok) {
          throw new Error(`HTTP error! Status: ${element.status}`);
        }
        return element.text();
      })
      .then((element) => {
        console.log('Response from server:', element);
        let res;
        try {
          res = JSON.parse(element);
        } catch (error) {
          res = element;
        }
        if (typeof res === 'string') {
          window.location.href = res;
        } else {
          if (res && res.code !== 1) {
            console.log(res.msg);
            layer.msg(res.msg);
          } else {
            layer.msg('未能成功获取Claude登录地址,请稍后重试');
          }
        }
      })
      .catch((element) => {
        console.error('There was a problem with the fetch operation:', element);
      })
      .finally(() => {
        layer.close(loadIndex);
      });
  }
}
function autoSelectCarAction() {
  if (isLogin()) {
    const loadIndex = setLoading('正在为您自动选车,请稍后...');

    const token = localStorage.getItem('accessToken');
    if (!token) {
      layer.msg('您还未登录,请先登录');
      goHome();
    }
    const username = getCookie('username');
    if (!username) {
      layer.msg('您还未登录，请先登录');
    }
    fetch(`/api/session/getIdleCar?username=${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((element) => {
        console.log('选车结果', element);
        if (!element.ok) {
          throw new Error(`HTTP error! Status: ${element.status}`);
        }
        return element.text();
      })
      .then((element) => {
        const res = JSON.parse(element);
        const idleCar = res.carID;
        const nodeType = res.nodeType;
        const planType = res.planType;
        if (idleCar) {
          const username = getCookie('username');
          if (!username || !nodeType) {
            layer.msg('自动选车异常,正在为您自动跳转到首页,请重新选择');
            goHome();
          }
          let loginData = {
            usertoken: username,
            carid: idleCar,
            nodeType: nodeType,
            planType: planType,
          };
          fetch(`/auth/login?carid=${idleCar}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
          }).then((element) => {
            console.log('选车后结果', element);
            if (element.redirected) {
              window.location.href = '/';
            } else {
              layer.msg('自动选车失败,请回到首页后手动选择');
            }
          });
        } else {
          throw new Error('Idle car not found');
        }
      })
      .catch((element) => {
        console.error('Error:', element);
        layer.msg('自动选车失败,将回到首页');
        goHome();
      })
      .finally(() => {
        layer.close(loadIndex);
      });
  }
}

function createMenuIcon() {
  if (htmlClass === 'dark') {
    return `<svg t="1728044864664" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5964" width="32" height="32"><path d="M511.33 63c-247.42 0-448 200.57-448 448s200.58 448 448 448 448-200.58 448-448-200.57-448-448-448z m163.42 625.54H347.91a42.27 42.27 0 0 1 0-84.53h326.84a42.27 42.27 0 1 1 0 84.53z m0-135.25H347.91a42.27 42.27 0 0 1 0-84.53h326.84a42.27 42.27 0 1 1 0 84.53z m0-135.24H347.91a42.27 42.27 0 0 1 0-84.53h326.84a42.27 42.27 0 1 1 0 84.53z" p-id="5965" fill="#ffffff"></path></svg>`;
  } else {
    return `<svg t="1727965674316" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18244" width="32" height="32"><path d="M512 0C228.266667 0 0 228.266667 0 512s228.266667 512 512 512 512-228.266667 512-512S795.733333 0 512 0z m234.666667 731.733333H277.333333c-23.466667 0-42.666667-19.2-42.666666-42.666666s19.2-42.666667 42.666666-42.666667h469.333334c23.466667 0 42.666667 19.2 42.666666 42.666667s-19.2 42.666667-42.666666 42.666666z m0-177.066666H277.333333c-23.466667 0-42.666667-19.2-42.666666-42.666667s19.2-42.666667 42.666666-42.666667h469.333334c23.466667 0 42.666667 19.2 42.666666 42.666667s-19.2 42.666667-42.666666 42.666667z m0-177.066667H277.333333c-23.466667 0-42.666667-19.2-42.666666-42.666667s19.2-42.666667 42.666666-42.666666h469.333334c23.466667 0 42.666667 19.2 42.666666 42.666666s-19.2 42.666667-42.666666 42.666667z" p-id="18245" fill="#2c2c2c"></path></svg>`;
  }
}

function fetchValidity() {
  return new Promise((resolve, reject) => {
    const username = getCookie('username');
    $.ajax({
      url: `/api/user/validity-usage?username=${encodeURIComponent(username)}`,
      method: 'GET',
      success: function (response) {
        validityText = response.validity
          ? `${response.validity}`
          : '有效期未知';
        usageText = response.usage ? `${response.usage}` : '不限制使用';
        $('#menuValidity').text(`会员有效期:${validityText}`);
        $('#menuUsage').text(usageText);
        resolve(validityText);
      },
      error: function (err) {
        validityText = '无法获取有效期';
        usageText = '无法获取使用量';
        $('#menuValidity').text(`会员有效期:${validityText}`);
        $('#menuUsage').text(usageText);
        reject(err);
      },
    });
  });
}
// 创建一个函数来根据当前主题更新样式
function updateThemeStyles() {
  const isDarkMode = document.documentElement.classList.contains('dark');
  $menuButton = $("<div id='menuButton'></div>")
    .css({
      position: 'fixed',
      right: '20px',
      top: '10%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      cursor: 'pointer',
      zIndex: '1000',
      color: isDarkMode ? '#fff' : '#000', // 图标颜色随主题变化
    })
    .html(createMenuIcon());

  $menu = $("<div id='menu'></div>").css({
    position: 'fixed',
    right: '20px',
    top: '15%',
    background: isDarkMode ? 'rgba(32, 33, 35, 0.9)' : 'white', // 暗色模式下使用深色背景
    borderRadius: '12px',
    padding: '10px 0',
    boxShadow: isDarkMode
      ? '0 4px 20px rgba(0,0,0,0.3)'
      : '0 4px 20px rgba(0,0,0,0.1)',
    display: 'none',
    zIndex: '999',
    backdropFilter: 'blur(8px)', // 添加模糊效果
    webkitBackdropFilter: 'blur(8px)', // Safari 支持
    color: isDarkMode ? '#fff' : '#000', // 文字颜色随主题变化
  });

}

function createMenu () {
  if ($('#menuButton').length === 0) {
	  updateThemeStyles();
    // 初始化时调用一次
    let menuItems = `<div class="flex flex-col space-y-2">
                <div style="display: flex;">
                    ${getMenuItemHtml(
                      '回到首页',
                      'layui-icon-home',
                      'goHome(this)'
                    )}
                    ${getMenuItemHtml(
                      '自动选车',
                      'layui-icon-util',
                      'autoSelectCarAction(this)'
                    )}
                </div>
                <div style="display: flex;">
                    ${getMenuItemHtml(
                      '个人中心',
                      'layui-icon-user',
                      'showProfile(this)'
                    )}
                    ${getMenuItemHtml(
                      '升级续费',
                      'layui-icon-diamond',
                      'showGoodsDialog(this)'
                    )}
                </div>
                <div style="display: flex;">
                ${getMenuItemHtml(
                  '站内公告',
                  'layui-icon-notice',
                  'showoNoticeDialog(this)'
                )}
                ${getMenuItemHtml(
                  '使用说明',
                  'layui-icon-read',
                  'showFAQDialog(this)'
                )}
            </div>
            <div style="display: flex;">
                ${getMenuItemHtml(
                  '导出文档',
                  'layui-icon-file',
                  'export2File(this)'
                )}
                ${getMenuItemHtml(
                  '导出图片',
                  'layui-icon-picture',
                  'export2Image(this)'
                )}
            </div>
                <div style="display: flex;">
                    ${getMenuItemHtml(
                      '实时语音',
                      'layui-icon-mike',
                      'setVoice(this)'
                    )}
                    ${getMenuItemHtml(
                      'Claude',
                      'layui-icon-senior',
                      'autoSelectClaude(this)'
                    )}
                </div>
				<div style="display: flex;">
                    ${getMenuItemHtml(
                      '备用站点',
                      'layui-icon-website',
                      'backApi(this)'
                    )}
                    ${getMenuItemHtml(
                      '退出登录',
                      'layui-icon-logout',
                      'logout(this)'
                    )}
                </div>
               
            </div>`;
    $menu.append(menuItems);
    $('body').append($menuButton);
    $('body').append($menu);
    $menu.show(); // 修改：菜单默认显示
    $menuButton.click(function () {
      $menu.toggle();
    });
  }
}

function showExpireTip() {
  if (validityText) {
    // 将有效期转换为 Date 对象
    let validityDate = new Date(validityText);
    let currentDate = new Date();

    // 计算剩余天数
    let timeDiff = validityDate - currentDate;
    let daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // 将毫秒转换为天数

    // 如果剩余天数小于等于3天，显示提示框
    if (daysLeft <= 3 && daysLeft > 0) {
      layer.open({
        type: 1,
        title: false,
        closeBtn: false,
        area: ['300px', 'auto'],
        shade: 0.8,
        id: 'LAY_layuipro',
        btn: ['立即续费', '稍后处理'],
        btnAlign: 'c',
        moveType: 1,
        content: `<div style="padding: 50px; line-height: 22px; background-color: #fff; color: #333; font-weight: 300;">
                            <i class="layui-icon layui-icon-notice" style="font-size: 30px; color: #FF9800;"></i>
                            <p style="margin-top:20px;">尊敬的用户，您的会员有效期将在 ${daysLeft} 天后过期</p>
                         </div>`,
        yes: function () {
          showGoodsDialog();
        },
      });
    } else if (daysLeft <= 0) {
      layer.open({
        type: 1,
        title: false,
        closeBtn: false,
        area: ['300px', 'auto'],
        shade: 0.8,
        id: 'LAY_layuipro',
        btn: ['立即续费', '稍后处理'],
        btnAlign: 'c',
        moveType: 1,
        content: `<div style="padding: 50px; line-height: 22px; background-color: #fff; color: #333; font-weight: 300;">
                            <i class="layui-icon layui-icon-notice" style="font-size: 30px; color: #FF9800;"></i>
                            <p style="margin-top:20px;">尊敬的用户，您的会员已到期！</p>
                         </div>`,
        yes: function () {
          showGoodsDialog();
        },
      });
    }
  } else {
    console.log(validityText); // 如果有效期未知，则输出提示
  }
}
(function init() {
  getConfig();
  console.log('list-version 202503280921');
})();
function getConfig() {
  const url = `/api/sys/site-data`;
  fetch(url)
    .then((response) => response.json())
    .then(({ code, data }) => {
      if (code === 1) {
        siteNotice = data.siteAnnouncement;
        FAQ = data.userGuideUrl;
        backApiUrl = data.backupUrl;
        enableSiteShop = data.enableSiteShop;
        enableExpirationReminder = data.enableExpirationReminder;
        fkAddress = data.fkAddress;
        enableNoLogin = data.enableNoLogin;
        enableBackNode = data.enableBackNode;
        enableShowRemaining = data.enableShowRemaining;
        enableNoSelectCar = data.enableNoSelectCar;
        // 开启备用镜像时，删除cookie
        if (enableBackNode == 'true') {
          deleteCookie('gfsessionid');
        }
        // 未开启免登的话，修改游客模式为false
        if (enableNoLogin == 'false') {
          setSessionCookie('visitor', false);
        }
        // Remove menu button if it exists
        if ($menuButton) {
          $menuButton.remove();
        }

        // Remove menu if it exists
        if ($menu) {
          $menu.remove();
        }

        // Clear usage and validity text
        $('#menuValidity').text('');
        $('#menuUsage').text('');

        // Remove any existing nav elements
        $(
          '.draggable.relative.h-full.w-full.flex-1.items-start nav>div:nth-child(3)'
        ).empty();

        // Reset the menu variables
        $menu = null;
        $menuButton = null;

        // Stop the intervals that create/update the menu
        if (window.menuCreateInterval) {
          clearInterval(window.menuCreateInterval);
        }
        if (window.regLoginButtonInterval) {
          clearInterval(window.regLoginButtonInterval);
        }
      
      } else {
        layer.msg(data);
      }
    })
    .catch((error) => {
      // 处理错误
      $('#menuValidity').text('');
      $('#menuUsage').text('');
      if ($menu) {
        $menu.hide();
      }
    });
}

function initLayUI() {
  layui.use(['layer'], function () {
    var layer = layui.layer;

    const closeChatDialog = (element) => {
      if (!element) {
        return;
      }
      if (!isMobile()) {
        $('[data-headlessui-state] nav').parent().addClass('layui-hide');
        $('#headlessui-portal-root').addClass('layui-hide');
      }
    };
    window.showProfile = (element) => {
      if (isLogin()) {
        closeChatDialog(element);
        showIframeDialog('个人中心', '/list/#/external-profile', 600, 1000, 2);
      }
    };
    window.showFAQDialog = (element) => {
      closeChatDialog(element);
      showIframeDialog(
        '使用说明',
        FAQ,
        600,
        1000,
        FAQ.startsWith('http') ? 2 : 1
      );
    };
    window.showGoodsDialog = (element) => {
      if (isLogin()) {
        closeChatDialog(element);
        if (enableSiteShop == 'true') {
          showIframeDialog(
            '站内购买',
            originUrl + '/list/#/shop',
            600,
            1000,
            2
          );
        } else {
          if (fkAddress) {
            showIframeDialog('卡密购买', fkAddress, 700, 1200, 2);
          } else {
            layer.msg('管理员还未配置卡密地址');
          }
        }
      }
    };
    window.showoNoticeDialog = (element) => {
      closeChatDialog(element);
      showIframeDialog(
        '站内公告',
        siteNotice,
        600,
        1000,
        siteNotice.startsWith('http') ? 2 : 1
      );
    };
    // 按钮生成函数
    const getRegAndLoginButtonHtml = (className, text, onClick) => {
      return `<button class="${className}" onclick="${onClick};">
    <div class="flex w-full gap-2 items-center justify-center">${text}</div>
  </button>`;
    };
    const initRegAndLoginButton = () => {
      // 删除速率提醒样式
      const rateElement = document.querySelector(
        'div.flex.w-full.items-start.gap-4.rounded-2xl.border.border-token-border-light'
      );
      if (rateElement) {
        rateElement.style.display = 'none';
        rateElement.remove();
      }
      var $div = $(
        '.draggable.relative.h-full.w-full.flex-1.items-start nav>div:nth-child(3)'
      );
      if ($div.length === 0) {
        return;
      }
      var allHaveInit = true;
      $div.each(function () {
        if (!$(this).hasClass('init')) {
          allHaveInit = false;
          return false;
        }
      });
      if (allHaveInit) {
        return;
      }
      $div.addClass('init');
      let html = '';
      if (isVisitor == 'false') {
        html = `<div class="flex flex-col space-y-2">
        <div style="display: block;">
        <div>
          <a class="flex  gap-2 rounded p-2.5 text-sm cursor-pointer focus:ring-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onclick="showRedeemDialog();">
            <i class="layui-icon layui-icon-gift layui-font-20"></i>
            卡密兑换
          </a>
        </div>
        
        ${enableShowRemaining === 'true' ? `
        <div id='menuUsage' style="flex:1; display: flex; justify-content: space-between;" class="gap-2 bg-slate-950 dark:bg-slate-600 rounded p-2.5 text-sm focus:ring-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group text-gray-800 dark:text-white">
          <span>${usageText || '加载中...'}</span>
        </div>
        ` : ''}

        <div id='menuValidity' style="flex:1; display: block;" class="flex gap-2 rounded p-2.5 text-sm focus:ring-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group text-gray-800 dark:text-white">
          ${'会员有效期:' + validityText || '加载中...'}
        </div>


        </div>
                <div style="display: flex;">
				
				
                    ${getMenuItemHtml(
                      '个人中心',
                      'layui-icon-user',
                      'showProfile(this)'
                    )}
                    ${getMenuItemHtml(
                      '升级续费',
                      'layui-icon-diamond',
                      'showGoodsDialog(this)'
                    )}
                </div>
               
            </div>`;
      } else {
        // 屏蔽头像
        $("button[data-testid='profile-button']").hide();
        html = `<div class="flex flex-col space-y-2">
                <div style="display: flex;">
                    ${getMenuItemHtml(
                      '站内公告',
                      'layui-icon-notice',
                      'showoNoticeDialog(this)'
                    )}
                    ${getMenuItemHtml(
                      '使用说明',
                      'layui-icon-read',
                      'showFAQDialog(this)'
                    )}
                </div>
                <div class="flex flex-col space-y-2">
                    ${getRegAndLoginButtonHtml(
                      'layui-btn layui-bg-black layui-btn-radius',
                      '登录',
                      'login(this)'
                    )}
                </div>
                <div class="flex flex-col space-y-2">
                    ${getRegAndLoginButtonHtml(
                      'layui-btn layui-bg-primary  layui-btn-radius',
                      '注册',
                      'register(this)'
                    )}
                </div>
            </div>`;
      }
      $div.html(html);
    };
    window.goHome = () => {
      window.location.href = originUrl + '/list/#/home';
    };
    window.login = () => {
      window.location.href = originUrl + '/list/#/login';
    };
    window.register = () => {
      window.location.href = originUrl + '/list/#/register';
    };
    $(document).on(
      'click',
      '.draggable.sticky button.inline-flex',
      function (event) {
        event.stopPropagation();
        initRegAndLoginButton();
      }
    );
    $(document).on('click', '[data-link]', function (event) {
      event.stopPropagation();
      const url = $(this).data('link');
      goToPage(url);
    });

    $(function () {
      console.log("初始化")
      fetchAnnouncement();
      updateThemeStyles();
      if (showMenu()) {
        fetchValidity()
          .then(() => {
            if (enableExpirationReminder == 'true') {
              showExpireTip();
            }
          })
          .catch((err) => {
            console.error('获取有效期失败:', err);
          });
      }

      setInterval(() => {
        initRegAndLoginButton();
      }, 10);

      if (showMenu()) {
        setInterval(() => {
          createMenu();
        }, 100);
      }

      setTimeout(() => {
        document.head.appendChild(document.createElement('style')).innerHTML =
          'div.h-full[class|=react-scroll-to-bottom--css]>div[class|=react-scroll-to-bottom--css]{overflow-y:auto;height:100%;}';
      }, 3000);
      // 添加全局点击事件，点击其他地方时关闭菜单
      $(document).click(function (e) {
        if (
          !$(e.target).closest('#menu').length &&
          !$(e.target).closest('#menuButton').length &&
          showMenu()
        ) {
          $menu.hide();
        }
        if (
          (e.type === 'click' && $(e.target).is('svg.icon-2xl')) ||
          (e.type === 'click' && $(e.target).is('div.min-w-8'))
        ) {
          fetchValidity();
        }
      });
    });

    // 添加兑换功能的代码
    window.showRedeemDialog = function () {
      if (!isLogin()) {
        layer.msg('请先登录');
        return;
      }

      layer.open({
        type: 1,
        title: ['卡密兑换', 'font-size: 16px; font-weight: 500;'],
        area: ['350px', 'auto'],
        content: `
                <div style="padding: 30px 25px;">
                    <div class="layui-form" style="margin: 0;">
                        <div class="layui-form-item" style="margin-bottom: 20px; position: relative;">
                            <i class="layui-icon layui-icon-key" style="position: absolute; left: 10px; top: 12px; color: #999;"></i>
                            <input type="text" id="cardKey" required lay-verify="required" 
                                placeholder="请输入卡密" autocomplete="off" 
                                class="layui-input" style="height: 40px; line-height: 40px; padding-left: 35px;">
                        </div>
                        <div class="layui-form-item" style="margin-bottom: 0;">
                            <button type="button" class="layui-btn layui-btn-normal layui-btn-fluid" 
                                style="height: 40px; line-height: 40px;"
                                onclick="redeemCard()">
                                <i class="layui-icon layui-icon-right" style="margin-right: 5px;"></i>立即兑换
                            </button>
                        </div>
                    </div>
                </div>
            `,
        skin: 'layui-layer-rim',
        closeBtn: 1,
        shadeClose: true,
        success: function (layero, index) {
          $(layero).find('.layui-layer-content').css('overflow', 'visible');
          $(layero).find('#cardKey').focus();

          // 添加回车键监听
          $(layero)
            .find('#cardKey')
            .on('keypress', function (e) {
              if (e.which === 13) {
                redeemCard();
              }
            });
        },
      });
    };
    // 添加兑换卡密的处理函数
    window.redeemCard = function () {
      const cardKey = $('#cardKey').val().trim();
      if (!cardKey) {
        layer.msg('请输入卡密');
        return;
      }

      const loadIndex = setLoading('正在兑换,请稍后...');
      const token = localStorage.getItem('accessToken');

      if (!token) {
        layer.close(loadIndex);
        layer.msg('认证已过期，请重新登录');
        return;
      }
      let userId = getUserId();

      fetch(
        `/api/codes/redeem?key=${encodeURIComponent(
          cardKey
        )}&userId=${encodeURIComponent(userId)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          layer.close(loadIndex);
          if (data.code === 1) {
            // 根据实际返回码调整
            layer.msg('兑换成功！', { icon: 1 });
            // 重新获取用户有效期和使用量
            fetchValidity();
            // 关闭兑换弹窗
            layer.closeAll();
          } else {
            layer.msg(data.msg || '兑换失败，请检查卡密是否正确', { icon: 2 });
          }
        })
        .catch((error) => {
          layer.close(loadIndex);
          if (error.message.includes('401')) {
            layer.msg('认证已过期，请重新登录');
          } else {
            layer.msg('兑换失败，请稍后重试', { icon: 2 });
          }
          console.error('Error:', error);
        });
    };
    window.setVoice = function () {
        // 如果是移动端，修改UA为PC端
        // if (isMobile()) {
        //   layer.msg("手机端还未")
        //   return
        // }
        if($('[data-testid="composer-speech-button"]').length < 1) {
            layer.msg("语音组件加载中，请稍后")
            return
        }
      $('[data-testid="composer-speech-button"]')[0].click();
    };
    const showIframeDialog = (title, url, height, width, type = 1) => {
      const isMobileVal = isMobile();
      width = isMobileVal
        ? $(window).width()
        : width || Math.min($(window).width(), 1024);
      height = isMobileVal
        ? $(window).height()
        : height || Math.min($(window).height(), 800);
      layer.open({
        type: type,
        title: [title, 'font-size: 18px;'],
        shadeClose: true,
        shade: 0.2,
        maxmin: true,
        scrollbar: false,
        offset: 'auto',
        area: [`${width}px`, `${height}px`],
        content: url,
      });
    };
    const goToPage = (element) => {
      const win = window == window.top ? window : window.top;
      win.location.href = element;
    };
  });
}
