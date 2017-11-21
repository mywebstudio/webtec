Template.taskProgress.helpers
	progresstatus: ->
		sub = Template.instance().data.arr
		i = 0
		for s in sub
			if s.status
				i++
		return i

	sub: ->
		return Template.instance().data.arr

