import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
//jwt.strategy.ts를 다른 곳에서도 사용하기 위해 주입하기 위해 데코레이터 사용

//Strategy를 넣는 이유는 jwt Strategy를 사용하기위해 넣는 것
//passport의 기본 전략을 jwt를하기 때문에 strategy 넣기
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'Secret1234', //토큰이 유효한지 체크할 때 사용 하는 것 모듈에서는 jwt 생성할때
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //토큰이 어디에서 가져왔냐 할 때, 헤더에서 Bearer 토큰 타입으로 넘어오는 걸 가져온다
    });
  }

  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
