import { useSelector } from 'react-redux'
// import { RouterProvider } from 'react-router-dom'
// import { ROUTER } from './Router'
import SelectProjectScreen from '@components/SelectProjectScreen/SelectProjectScreen'
import { type RootState } from '@redux/store'
import { useEffect } from 'react'

export const Layout = (): JSX.Element => {
  const selectedProject = useSelector(
    (state: RootState) => state.selectedProject
  )

  useEffect(() => {
    console.log(selectedProject)
  }, [selectedProject])

  return <SelectProjectScreen token="" />
}
