import NavigationStrings from "../Data/NavigationStrings";

export default class NavigationRepository{
    routes: string[] = [
        NavigationStrings.blocModel
    ];

    activeRoute: string = "";
}