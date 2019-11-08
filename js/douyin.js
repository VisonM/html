window.onload = function () {
//global const
  const wrapperList = document.getElementsByClassName('swiper-slide')
  let playedList = []
  let isAutoPlay = false

//init
  initConfirmEvent()
  document.addEventListener('WeixinJSBridgeReady', () => {
    console.log('WeixinJSBridgeReady')
  }, false)

//tools
  function closeModal () {
    const confirmElem = document.getElementById('confirm')
    confirmElem.classList.remove('show')
  }

  function showModal () {
    const confirmElem = document.getElementById('confirm')
    confirmElem.classList.add('show')
  }

  function showToast (text) {
    const toastElem = document.getElementById('toast')
    toastElem.classList.add('show')
    toastElem.innerText = text
    setTimeout(() => {
      toastElem.classList.remove('show')
    }, 1000)
  }

//event
  function initConfirmEvent () {
    const confirmElem = document.getElementById('confirm')
    const actionElem = confirmElem.querySelector('.action')
    actionElem.addEventListener('click', (event) => {
      event = event || window.event;
      const target = event.target || event.srcElement;
      switch (target.id) {
        case 'cancel':
          handleModalCallback()
          break
        case 'ok':
          handleModalCallback(true)
          break
        default:
          break
      }
    })
  }

  function handleModalCallback (flag) {
    if (flag) {
      this.isAutoPlay = true
    }
    mySwiper.setTransition(1000);
    mySwiper.setTranslate(-200);
    showToast('下拉看更多喔')
    setTimeout(() => {
      mySwiper.setTransition(1000);
      mySwiper.setTranslate(0);
    }, 1000)
    const videoElem = wrapperList[mySwiper.activeIndex].querySelector('video')
    renderCover(videoElem)
    observeVideo(videoElem, mySwiper.activeIndex, () => {
      mySwiper.slideNext()
    })
    closeModal()
  }

  function renderCover (elem) {
    const cover = elem.getAttribute('cover-src') || 'https://images.freeimages.com/images/small-previews/815/birds-ii-1379356.jpg'
    const filterElem = document.querySelector('.filter')
    filterElem.style.backgroundImage = `url(${cover})`
  }

  function observeVideo (elem, index, endCb) {
    const video_src = elem.getAttribute('data-src')
    elem.setAttribute('src', video_src)
    playedList.push(index)
    elem.addEventListener('waiting', function () {
      console.log('视频正在加载')
    })
    elem.addEventListener('canplaythrough', function () {
      console.log('视频加载完毕')
      elem.play()
      elem.muted = false
    })
    elem.addEventListener('error', function (e) {
      console.error('视频加载失败');
      showToast('视频加载失败')
    });
    elem.addEventListener('ended', function () {
      console.log('视频播放完毕')
      endCb()
    })
  }

// lib init
  const vConsole = new VConsole();
  const mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical', // 垂直切换选项
    loop: false, // 循环模式选项
    on: {
      init: function () {
        showModal()
      },
      slideChange: function () {
        const lastVideoElem = wrapperList[this.previousIndex].querySelector('video')
        lastVideoElem && lastVideoElem.pause()
        const nextVideoElem = wrapperList[this.activeIndex].querySelector('video')
        if (playedList.indexOf(this.activeIndex) !== -1) {
          nextVideoElem && nextVideoElem.play()
        } else {
          renderCover(nextVideoElem)
          observeVideo(nextVideoElem, this.activeIndex, () => {
            if (this.isEnd) {
              if (window.confirm('已经没有更多了，去抖音看看？')) {
                window.location.href = 'https://www.douyin.com/'
              }
            } else {
              this.slideNext()
            }
          })
        }
      },
    },
  })
}
