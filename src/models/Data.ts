import {Season} from './Season';
import {Round} from './Round';
import {Tournament} from './Tournament';
import {Country} from './Country';
import {Team} from './Team';

export class Data {
    seasons = new Map<number, Season>();
    rounds = new Map<number, Round>();
    tournamentsMap = new Map<number, Tournament>();
    tournamentsPathMap = new Map<string, Tournament>();
    countryMap = new Map<number, Country>();
    teams = this.json.teams;
    countries = this.json.leagues
    teamsPathMap = new Map<string, Team>();
    teamsMap = new Map<number, Team>();

    getSeasonById(id: number) {
        return this.seasons.get(id);
    }

    getTeamById(id: number) {
        return this.teamsMap.get(id);
    }

    getTournamentById(id: number) {
        return this.tournamentsMap.get(id);
    }

    getCountryById(id: number) {
        return this.countryMap.get(id);
    }

    constructor(public json: any) {
        this.teams.forEach((team: Team) => {
            this.teamsMap.set(team.id, team);
            this.teamsPathMap.set(team.path, team);
        });
        this.countries.forEach((country: Country) => {
            this.countryMap.set(country.id, country);
            country.tournaments.forEach(tournament => {
                tournament.countryId = country.id;
                this.tournamentsMap.set(tournament.id, tournament);
                this.tournamentsPathMap.set(tournament.path, tournament);
                tournament.seasons.forEach(season => {
                    season.tournamentId = tournament.id;
                    this.seasons.set(season.id, season);
                    this.addRound(season.rounds, season.id);
                });
            });
        });
    }

    private addRound(rounds: Round[], seasonId: number) {
        for (let i = 0; i < rounds.length; i++) {
            const round = rounds[i];
            // round.seasonId = seasonId;
            this.rounds.set(round.id, round);
            this.addRound(round.items, seasonId);
        }
    }
}
