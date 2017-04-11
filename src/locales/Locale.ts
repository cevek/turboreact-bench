function plural(num: number, one: string, many: string) {
    return num === 1 ? one : many;
}
type F = (val: string | number) => string;


export class Locale {
    name = 'en_US';

    site_name = 'FastScores';
    timeline_title = 'Matches of the day';
    timeline_live_title = 'Live Matches';

    data_season: F = s => `Season ${s}`;
    data_round: F = r => `Round ${r}`;
    data_group: F = g => `Group ${g}`;

    section_overview = 'Overview';
    section_results = 'Results';
    section_fixtures = 'Fixtures';
    section_standings = 'Standings';
    section_table = 'Table';

    eventstatus_finished = 'Finished';
    eventstatus_extra_time = 'ET';
    eventstatus_penalty = 'Pen';
    eventstatus_cancelled = 'Cancelled';
    eventstatus_upcoming = 'Upcoming';

    table_col_num = '#';
    table_col_team = 'Team';
    table_col_wdl = 'W-D-L';
    table_col_win = 'Win';
    table_col_draw = 'Draw';
    table_col_lose = 'Lose';
    table_col_plus_minus = '+/-';
    table_col_points = 'Points';
    table_col_form = 'Form';

    any_more_info = 'More info';
    any_data_not_found = 'Data not found';

    eventaction_goal = 'Goal';
    eventaction_penalty_goal = 'Shootout goal';
    eventaction_miss = 'Miss';
    eventaction_red_card = 'Red Card';
    eventaction_yellow_card = 'Yellow Card';
    eventaction_second_yellow_card = 'Second Yellow Card';
    eventaction_substitution = 'Substitution';

    event_time_abbrv = 'min';

    fixtures_notavailable = 'Fixtures will be available soon';

    eventpage_last_games = 'Last games';
    eventpage_goals_scored_plural = (n: number) => plural(n, `Scored ${n} goal`, `Scored ${n} goals`);

    not_foundpage_text = 'We are sorry, but the page you are looking for is not found. Watch a kitten is doing some football instead!';

    contacts_title = 'Contact FastScores';
    contacts_name = 'Your name';
    contacts_email = 'Your email address';
    contacts_text = 'Please tell us how we can help you';
    contacts_submit = 'Submit';
    contacts_error = 'An Error Occurred';
    contacts_submitted = 'Your message has been submitted';

    return_top = 'To The Top';

    download_title = 'FastScores App';
    download_desc = 'Fastscores – the best sporting app. It provides easy access to the results, standings and fixtures of top European football leagues. Fastscores in your phone!';
    download_in = 'Get on';

    live_first_half = '1st half';
    live_second_half = '2nd half';

    live_event__info = 'Info';
    live_event__goals = 'Goals';
    live_event__go = 'In Match';

    team__favorite_added = 'You removed the team from favourites';
    team__favorite_removed = 'You removed the team from favourites';
    team__favorite_replace = 'Вы хотите поменять команду'; // todo:
}

