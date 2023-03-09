// alert('연결성공');
$(function() {
	const $header = $('header');
	const $news = $header.nextAll('#news');
	const $mnu = $('header>.container>nav>.gnb>li>a');
	const $aside = $('aside');
	const $gnb = $header.find('.gnb');
	const $btnGnb = $header.find('.btn-gnb'); //메뉴셀렉팅 -> DOM 선택
	const arrTopVal = []; //배열은 여러 데이터를 한번에 저장, 관리
	let nowIdx = 0;
	const headerH = $header.height();

	//셀렉팅 집합을 순회하며 처리하는 .each() 메소드
	//각 section의 top값을 배열에 저장
	$('section').each(function(idx) {
		//어떤 요소의 top 값(body로부터 떨어진 거리)을 구하는 방법 => .offset().top
		arrTopVal[idx] = $(this).offset().top;
	});

	$(window).on('scroll', function() {
		//1. 현재 스크롤바의 top값 추출
		let scrollTop = Math.ceil($(this).scrollTop());

		//2. 메뉴 활성화 표시
		for (let i = 0; i < $mnu.length; i++) {
			//for문을 이용하여 5개의 if문을 하나로 작성
			if (scrollTop >= arrTopVal[i] - headerH - 200) {
				$mnu.eq(i).parent().addClass('on').siblings().removeClass('on');
			} else if (scrollTop < arrTopVal[0] - headerH - 200) {
				$mnu.parent().removeClass('on');
			}
		}

		//3. 맨위로가기 top 버튼
		//view>0 이면 푸터가 화면에 노출되었다는 것을 의미
		const view = scrollTop + $(window).height() - $('footer').offset().top;

		if (view > 0) {
			//푸터노출
			$aside.css('margin-bottom', view);
		} else {
			$aside.css('margin-bottom', 0);
		}

		//4. 탑버튼 노출처리
		if (scrollTop > 120) {
			$aside.fadeIn();
		} else {
			$aside.fadeOut();
		}
	});

	//5.네비게이션 click에 따른 페이지 이동
	$mnu.on('click', function(evt) {
		evt.preventDefault();

		nowIdx = $mnu.index(this); //이번에 클릭한 메뉴의 인덱스번호 추출
		$('html,body').animate({ scrollTop: arrTopVal[nowIdx] - headerH });

		if (window.innerWidth <= 640) {
			$btnGnb.trigger('click');//이벤트를 강제로 발생시키는 메소드 trigger('이벤트명');
		}
	});

	//6.모바일 전용 메뉴버튼
	$btnGnb.on('click', function() {
		$(this).toggleClass('clse');
		$gnb.toggle();
	})

	$('.logo,.submnu, aside').on('click', function(evt) {
		evt.preventDefault();
		$('html,body').animate({ scrollTop: 0 });
	});
});

//# CJ HERITAGE 영역
const swiper = new Swiper('.swiper', {
	// Optional parameters
	slidesPerView: 3, //한 화면에 보이는 슬라이드의 개수
	spaceBetween: 20, //슬라이드간의 간격
	slidesPerGroup: 1, //한번에 슬라이드 되는 개수
	loop: true, //무한반복

	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
		clickable: true //인디케이터 클릭가능여부
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
});
