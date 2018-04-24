var count = 1;
function addNewAnswerTextbox() {
	str = '<br> ' +
		'<div class="input-group abc"> ' +
		'<span class="input-group-addon">' +
		'  <input id="is_active[]" type="checkbox" checked>' +
		'</span>' +
		'<input id="is_answer" name="is_answer[]" type="text" class="form-control">' +
		'</div>';
	$("#form_answers").append(str)
	count++;
}

//edit
function editContent(id) {
	$.get('/edit/' + id, (res) => {
		alert('topic : ' + res.topic + ' , user_say : ' + res.user_say + ', answer : ' + res.answer + 'update time : ' + res.updatetime)
	})
}

//delete
function confirmDeleteContent(id) {
	swal({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
		if (result) {
			$.post('/delete/' + id, (res) => {
				if (res === 'ok') {
					swal({
						type: 'success',
						title: 'Done !',
						showConfirmButton: false,
						timer: 1000
					})
					setTimeout(() => {
						location.reload();
					}, 1000)
				}
			})
		}
	}, function (dismiss) {
		if (dismiss) {
			return null
		}
	})
}
// switch
var clickCheckbox = document.querySelector('.js-switch');
$('.js-switch').click(() => {
	if (!clickCheckbox.checked) {
		if (confirm('Your data will be close!')) {
			if (count > 1) {
				$('br').remove();
				$('.abc').remove();
			}
			$(".addAnswer").remove();
			return true;
		} else {
			return false
		}
	} else {
		$(".Addanswer").append('<button type="button" class="btn btn-success addAnswer" id="btn_answer_1" onclick="addNewAnswerTextbox()"><i class="icon-plus22"></i> Add Answer</button>')
	}
})


// reset value
function reset() {
	$('.abc').remove();
	$("#tags_1").val("abc");
	$(".tag").remove();
	$('br').remove();
	$('input').val("");
}


// save data
function Save() {
	const x = $("#form_answers").serializeArray();
	var data = []
	$.each(x, function (i, field) {
		data.push(field.value)
	});
	if (data === [""] || $("#tags_1").val() === "") {
		return null
	} else {
		$.post('/add', {
			ask: $("#tags_1").val(),
			answer: data
		}, (res) => {
			if (res === 'ok') {
				swal({
					type: 'success',
					title: 'Your data has been saved',
					showConfirmButton: false,
					timer: 1000
				})
				setTimeout(() => {
					location.reload();
				}, 1000)
			} else {
				swal({
					type: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				})
			}
		})
	}
}